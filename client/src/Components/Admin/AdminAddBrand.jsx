import { Row, Col, Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import AddBrandHook from './../../hook/brand/add-brand-hook';

const AdminAddBrand = () => {
    const [img, name, loading, isPress, handelSubmit, onImageChange, onChangeName] = AddBrandHook();
    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">اضف ماركه جديده</div>
                <Col sm="8">
                    <div className="text-form pb-2">صوره الماركه</div>
                    <div>
                        <label htmlFor="upload-photo">
                            <img
                                src={img}
                                alt="Brand preview"
                                height="100px"
                                width="120px"
                                style={{ 
                                    cursor: "pointer",
                                    border: '2px dashed #ccc',
                                    borderRadius: '8px',
                                    padding: '4px'
                                }}
                            />
                        </label>
                        <input
                            type="file"
                            name="photo"
                            onChange={onImageChange}
                            id="upload-photo"
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <div className="mt-2 text-muted small">
                            Click the image to upload (Supported formats: JPG, PNG)
                        </div>
                    </div>
                    <input
                        type="text"
                        value={name}
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم الماركه"
                        onChange={onChangeName}
                        disabled={loading}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button 
                        onClick={handelSubmit} 
                        className="btn-save d-inline mt-2"
                        disabled={loading || !name.trim() || img === 'avatar.png'}
                    >
                        {loading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="me-2"
                                />
                                Processing...
                            </>
                        ) : (
                            'حفظ التعديلات'
                        )}
                    </button>
                </Col>
            </Row>
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default AdminAddBrand
