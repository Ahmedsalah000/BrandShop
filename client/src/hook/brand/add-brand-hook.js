import  { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createBrand } from '../../redux/actions/brandAction'
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../hook/useNotifaction'
import avatar from '../../images/avatar.png'

const AddBrandHook = () => {
    const dispatch = useDispatch();
    const [img, setImg] = useState(avatar)
    const [name, setName] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isPress, setIsPress] = useState(false)

    // No authentication check at component mount - assume user is authorized

    //to change name state
    const onChangeName = (event) => {
        event.persist();
        setName(event.target.value.trim())
    }

    //when image change save it 
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            console.log('Image selected:', file.name);

            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                notify('Please select a valid image file (JPG or PNG)', "error");
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                notify('Image size should be less than 5MB', "error");
                return;
            }

            setImg(URL.createObjectURL(file))
            setSelectedFile(file)
        }
    }

    const res = useSelector(state => state.allBrand.brand)

    //save data in database
    const handelSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submission started with name:', name);

        // No token verification - removed authentication check

        // Validate form data
        if (!name.trim()) {
            notify('Brand name is required', "warn");
            return;
        }

        if (!selectedFile) {
            notify('Please select a brand image', "warn");
            return;
        }

        const formData = new FormData();
        formData.append("name", name.trim())
        formData.append("image", selectedFile)
        console.log('FormData created with name and image');
        
        setLoading(true)
        setIsPress(true)
        
        try {
            console.log('Dispatching createBrand action...');
            await dispatch(createBrand(formData))
            console.log('Brand creation action dispatched successfully');
        } catch (error) {
            console.error('Brand creation failed:', error);
            notify(error.message || 'Failed to add brand. Please try again.', "error");
            setLoading(false)
            setIsPress(false)
            return;
        }
        setLoading(false)
    }

    useEffect(() => {
        if (!loading && isPress) {
            console.log('Brand creation process completed, Response:', res);

            if (res && res.status === 201) {
                console.log('Brand added successfully');
                notify('Brand added successfully', "success");
                // Reset form
                setImg(avatar)
                setName("")
                setSelectedFile(null)
                setIsPress(false)
            } else {
                console.log('Brand creation failed with response:', res);
                notify('Failed to add brand. Please check your connection and try again.', "error");
                setIsPress(false)
            }
        }
    }, [loading, res, isPress])

    return [img, name, loading, isPress, handelSubmit, onImageChange, onChangeName]
};

export default AddBrandHook