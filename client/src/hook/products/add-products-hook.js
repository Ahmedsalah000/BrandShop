
import { useState, useEffect } from 'react'
import { getOneCategory } from '../../redux/actions/subcategoryAction';
import { createProduct } from '../../redux/actions/productsAction';
import notify from './../../hook/useNotifaction';
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../redux/actions/categoryAction'
import { getAllBrand } from './../../redux/actions/brandAction';

const AdminAddProductsHook = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategory());
        dispatch(getAllBrand());
    }, [])
    //get last catgeory state from redux
    const category = useSelector(state => state.allCategory.category)
    //get last brand state from redux
    const brand = useSelector(state => state.allBrand.brand)

    //get last sub cat state from redux
    const subCat = useSelector(state => state.subCategory.subcategory)

    const onSelect = (selectedList) => {
        setSeletedSubID(selectedList)
    }
    const onRemove = (selectedList) => {
        setSeletedSubID(selectedList)
    }

    const [options, setOptions] = useState([]);

    //values images products
    const [images, setImages] = useState({});
    //values state
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState('');
    const [priceAftr, setPriceAftr] = useState('');
    const [qty, setQty] = useState('');
    const [CatID, setCatID] = useState('');
    const [BrandID, SetBrandID] = useState('');
    const [subCatID, setSubCatID] = useState([]);
    const [seletedSubID, setSeletedSubID] = useState([]);
    const [loading, setLoading] = useState(true);


    //to change name state
    const onChangeProdName = (event) => {
        event.persist();
        setProdName(event.target.value)
    }
    //to change name state
    const onChangeDesName = (event) => {
        event.persist();
        setProdDescription(event.target.value)
    }
    //to change name state
    const onChangePriceBefor = (event) => {
        event.persist();
        setPriceBefore(event.target.value)
    }
    //to change name state
    const onChangePriceAfter = (event) => {
        event.persist();
        setPriceAftr(event.target.value)
    }  //to change name state
    const onChangeQty = (event) => {
        event.persist();
        setQty(event.target.value)
    }
    const onChangeColor = (event) => {
        event.persist();
        setShowColor(!showColor)
    }

    //to show hide color picker
    const [showColor, setShowColor] = useState(false);
    //to store all pick color
    const [colors, setColors] = useState([]);
    //when choose new color
    const handelChangeComplete = (color) => {
        setColors([...colors, color.hex])
        setShowColor(!showColor)
    }
    const removeColor = (color) => {
        const newColor = colors.filter((e) => e !== color)
        setColors(newColor)
    }



    //when selet category store id
    const onSeletCategory = async (e) => {
        if (e.target.value !== 0) {
            await dispatch(getOneCategory(e.target.value))
        }
        setCatID(e.target.value)
    }
    useEffect(() => {
        if (CatID !== 0) {
            if (subCat.data) {

                setOptions(subCat.data)
            }
        } else
            setOptions([])
    }, [CatID])

    //when selet brand store id
    const onSeletBrand = (e) => {
        SetBrandID(e.target.value)
    }

    //to convert base 64 to file
    function dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    //to save data 
    const handelSubmit = async (e) => {
        e.preventDefault();
        if (CatID === 0 || prodName === "" || prodDescription === "" || images.length <= 0) {
            notify("Please complete all required fields", "warn");
            return;
        }

        const numericPrice = Number(priceBefore);
        const numericQty = Number(qty);

        if (isNaN(numericPrice) || numericPrice <= 0) {
            notify("Please enter a valid price", "warn");
            return;
        }

        if (isNaN(numericQty) || numericQty <= 0) {
            notify("Please enter a valid quantity", "warn");
            return;
        }

        //convert base 64 image to file 
        const imgCover = dataURLtoFile(images[0], Math.random() + ".png")
        //convert array of base 64 image to file 
        const itemImages = Array.from(Array(Object.keys(images).length).keys()).map(
            (item, index) => {
                return dataURLtoFile(images[index], Math.random() + ".png")
            }
        )

        const formData = new FormData();
        formData.append("title", prodName);
        formData.append("description", prodDescription);
        formData.append("quantity", qty);
        formData.append("price", priceBefore);

        formData.append("category", CatID);
        formData.append("brand", BrandID);

        setTimeout(() => {
            formData.append("imageCover", imgCover);
            itemImages.map((item) => formData.append("images", item))
        }, 1000);

        setTimeout(() => {
            console.log(imgCover)
            console.log(itemImages)
        }, 1000);
        colors.map((color) => formData.append("availableColors", color))
        seletedSubID.map((item) => formData.append("subcategory", item._id))
        setTimeout(async () => {
            setLoading(true)
            await dispatch(createProduct(formData))
            setLoading(false)
        }, 1000);

    }

    //get create meesage
    const product = useSelector(state => state.allproducts.products)

    useEffect(() => {

        if (loading === false) {
            // setCatID(0)
            setColors([])
            setImages([])
            setProdName('')
            setProdDescription('')
            setPriceBefore('')
            setPriceAftr('')
            setQty('')
            SetBrandID(0)
            setSeletedSubID([])
            setTimeout(() => setLoading(true), 1500)

            if (product) {
                if (product.status === 201) {
                    notify("Product added successfully", "success")
                } else {
                    notify("There was a problem adding the product", "error")
                }
            }
        }
    }, [loading])


    return [onChangeDesName, onChangeQty, onChangeColor, onChangePriceAfter, onChangePriceBefor, onChangeProdName, showColor, category, brand, priceAftr, images, setImages, onSelect, onRemove, options, handelChangeComplete, removeColor, onSeletCategory, handelSubmit, onSeletBrand, colors, priceBefore, qty, prodDescription, prodName]

}

export default AdminAddProductsHook