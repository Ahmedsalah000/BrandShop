import React from 'react'
import { Col, Row } from 'react-bootstrap';
import AddRateHook from '../../hook/review/add-rate-hook';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';


const RatePost = () => {

  const [hover, setHover] = React.useState(-1);
  const {id} =useParams() ;
  const [OnChangeRateText, OnChangeRateValue, rateText, rateValue, user, onSubmit] = AddRateHook(id)

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };
  function getLabelText(rateValue) {
    return `${rateValue} Star${rateValue !== 1 ? 's' : ''}, ${labels[rateValue]}`;
  }

  var name = ""
  if (user)
    name = user.name



  //   size: 20,
  //   count: 5,
  //   color: "#979797",
  //   activeColor: "#ffc107",
  //   value: 7.5,
  //   a11y: true,
  //   isHalf: true,
  //   emptyIcon: <i className="far fa-star" />,
  //   halfIcon: <i className="fa fa-star-half-alt" />,
  //   filledIcon: <i className="fa fa-star" />,
  //   onChange: newValue => {
  //     OnChangeRateValue(newValue);
  //   }
  // };
  return (
    <div>
      <Row className="mt-3 ">
        <Col sm="12" className="me-5  d-flex">
          <div className="rate-name  d-inline ms-3 mt-1 ">{name}</div>
          <Box sx={{ width: 200, display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
      <Rating
        name="hover-feedback"
        value={rateValue}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          OnChangeRateValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {rateValue !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rateValue]}</Box>
      )}
    </Box>

        </Col>
      </Row>
      <Row className="border-bottom mx-2">
        <Col className="d-felx me-4 pb-2">
          <textarea
            value={rateText}
            onChange={OnChangeRateText}
            className="input-form-area p-2 mt-3"
            rows="2"
            cols="20"
            placeholder="اكتب تعليقك...."
          />
          <div className=" d-flex justify-content-end al">
            <div onClick={onSubmit} className="product-cart-add px-3  py-2 text-center d-inline">اضف تعليق</div>
          </div>
        </Col>
      </Row>
      <ToastContainer />

    </div>
  )
}

export default RatePost
