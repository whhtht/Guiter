import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useOrder } from "../../../../hooks/useOrder.hook/hook/page";

import { Box, Typography, Breadcrumbs, Button, Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Detail: React.FC = () => {
  const accessToken = localStorage.getItem("accessToken");
  const {
    detail,
    handleOrderDetail,
    quantity,
    subtotal,
    shippingFee,
    hst,
    total,
  } = useOrder();
  const ordernumber = sessionStorage.getItem("ordernumber") || "";

  useEffect(() => {
    if (accessToken) {
      handleOrderDetail(ordernumber);
    }
  }, [handleOrderDetail, accessToken, ordernumber]);

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* 导航栏 */}
      <Breadcrumbs>
        <Typography
          component={Link}
          to="/order"
          sx={{
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "22px",
            textAlign: "left",
            color: "#76757C",
            textDecoration: "none",
            "&:hover": {
              textDecorationSkipInk: "none",
              textDecoration: "underline",
            },
          }}
        >
          My Orders
        </Typography>
        <Typography
          component={Link}
          to="/order/detail"
          sx={{
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "22px",
            textAlign: "left",
            color: "#02000C",
            textDecoration: "none",
            "&:hover": {
              textDecorationSkipInk: "none",
              textDecoration: "underline",
            },
          }}
        >
          Order Details
        </Typography>
      </Breadcrumbs>

      {/* 订单详情 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "30px",
            fontWeight: 700,
            lineHeight: "40px",
            textAlign: "left",
            color: "#02000C",
          }}
        >
          Order Details
        </Typography>
        <Typography
          component={Link}
          to="/order/detail"
          sx={{
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "24px",
            textAlign: "right",
            color: "#02000C",
          }}
        >
          View invoice
        </Typography>
      </Box>

      {/* 订单信息 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "1024px",
          height: "264px",
          border: "1px solid #DDDCDE",
          borderRadius: "4px",
          gap: "24px",
          padding: "24px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "28px",
            textAlign: "left",
            color: "#02000C",
          }}
        >
          Order status & details
        </Typography>
        <Box sx={{ width: "976px", borderTop: "1px solid #DDDCDE" }} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* 准备发货 */}
          {detail?.status === "prepar" ? (
            <Box sx={{ display: "flex", gap: "4px" }}>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  textAlign: "left",
                  color: "#008A02",
                }}
              >
                Preparing for shipping!
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  textAlign: "left",
                  color: "#02000C",
                }}
              >
                Estimated delivery: Sat, Jul 27
              </Typography>
            </Box>
          ) : null}
          {/* 已经发货 */}
          {detail?.status === "ship" ? (
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                textAlign: "left",
                color: "#02000C",
              }}
            >
              Item shipped! Estimated delivery: Sat, Jul 27
            </Typography>
          ) : null}
          {/* 可以自提 */}
          {detail?.status === "pickup" ? (
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                textAlign: "left",
                color: "#008A02",
              }}
            >
              Ready for pickup!
            </Typography>
          ) : null}
          {/* 已自提 */}
          {detail?.status === "done" ? (
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                textAlign: "left",
                color: "#02000C",
              }}
            >
              Item picked up: Sat, Jul 27
            </Typography>
          ) : null}
          {/* 订单信息 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* 订单号 */}
            <Box sx={{ display: "flex", gap: "8px" }}>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22px",
                  textAlign: "left",
                  color: "#76757C",
                }}
              >
                Order number:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22px",
                  textAlign: "left",
                  color: "#02000C",
                }}
              >
                {detail?.orderId}
              </Typography>
            </Box>
            {/* 订单时间 */}
            <Box sx={{ display: "flex", gap: "8px" }}>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22px",
                  textAlign: "left",
                  color: "#76757C",
                }}
              >
                Order placed:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22px",
                  textAlign: "left",
                  color: "#02000C",
                }}
              >
                {new Date(detail?.data || "").toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </Typography>
            </Box>
            {/* 运送信息 */}
            {detail?.type === "delivery" ? (
              <Box>
                <Box sx={{ display: "flex", gap: "8px" }}>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "22px",
                      textAlign: "left",
                      color: "#76757C",
                    }}
                  >
                    Shipped by:
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "22px",
                      textAlign: "left",
                      color: "#76757C",
                    }}
                  >
                    Available soon
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "8px" }}>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "22px",
                      textAlign: "left",
                      color: "#76757C",
                    }}
                  >
                    Tracking number:
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "22px",
                      textAlign: "left",
                      color: "#76757C",
                    }}
                  >
                    Available soon
                  </Typography>
                </Box>
              </Box>
            ) : null}
            {/* 自提信息 */}
            {detail?.type === "pickup" ? (
              <Box>
                <Box sx={{ display: "flex", gap: "8px" }}>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "22px",
                      textAlign: "left",
                      color: "#76757C",
                    }}
                  >
                    Pickup store address:
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "22px",
                      textAlign: "left",
                      color: "#02000C",
                    }}
                  >
                    382 Yonge Street, Toronto
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "8px" }}>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "22px",
                      textAlign: "left",
                      color: "#76757C",
                    }}
                  >
                    Pickup store hours:
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "22px",
                      textAlign: "left",
                      color: "#02000C",
                    }}
                  >
                    Mon - Fri 10:00 am - 10:00 pm (EST), Sat - Sun 10:00 am -
                    6:00pm (EST)
                  </Typography>
                </Box>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>

      {/* 物品信息 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #DDDCDE",
          borderRadius: "4px",
          gap: "24px",
          padding: "24px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "28px",
            textAlign: "left",
            color: "#02000C",
          }}
        >
          Items purchased
        </Typography>
        <Box sx={{ width: "976px", borderTop: "1px solid #DDDCDE" }} />
        {/* 商品信息 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {detail?.products.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <Box sx={{ display: "flex", gap: "16px" }}>
                <Box
                  component="img"
                  sx={{
                    width: "92px",
                    height: "92px",
                    border: "1px solid #02000C",
                    borderRadius: "4px",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "400px",
                    gap: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      textAlign: "left",
                      color: "#02000C",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "22px",
                      textAlign: "left",
                      color: "#76757C",
                    }}
                  >
                    {item.condition}
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  textAlign: "right",
                  color: "#02000C",
                }}
              >
                $ {item.price}
              </Typography>
            </Box>
          ))}
        </Box>
        {/* 订单总额 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Box sx={{ width: "976px", borderTop: "1px solid #DDDCDE" }} />
          {/* 税前总额 */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Item subtotal ({quantity}) </Typography>
            <Typography>${subtotal.toFixed(2)}</Typography>
          </Box>
          {/* 运费 */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Shipping fee </Typography>
            <Typography>${shippingFee.toFixed(2)}</Typography>
          </Box>
          {/* HST */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>HST </Typography>
            <Typography>${hst.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ width: "976px", borderTop: "1px solid #DDDCDE" }} />
          {/* 总额 */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Total </Typography>
            <Typography>${total.toFixed(2)}</Typography>
          </Box>
        </Box>
      </Box>

      {detail?.type === "delivery" ? (
        // 配送地址信息
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "230px",
            border: "1px solid #DDDCDE",
            borderRadius: "4px",
            gap: "24px",
            padding: "24px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "28px",
              textAlign: "left",
              color: "#02000C",
            }}
          >
            Deliver to your address
          </Typography>
          <Box sx={{ width: "976px", borderTop: "1px solid #DDDCDE" }} />
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "24px",
              textAlign: "left",
              color: "#02000C",
            }}
          >
            {detail.address.name} <br /> {detail.address.phone} <br />
            {detail.address.address}, {detail.address.city} <br />
            {detail.address.province}, {detail.address.postalCode},{" "}
            {detail.address.country}
          </Typography>
        </Box>
      ) : (
        // 自提地址信息
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "172px",
            border: "1px solid #DDDCDE",
            borderRadius: "4px",
            gap: "24px",
            padding: "24px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "28px",
              textAlign: "left",
              color: "#02000C",
            }}
          >
            Pickup contact details
          </Typography>
          <Box sx={{ width: "976px", borderTop: "1px solid #DDDCDE" }} />
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "24px",
              textAlign: "left",
              color: "#02000C",
            }}
          >
            {detail?.address.name} <br /> {detail?.address.phone}
          </Typography>
        </Box>
      )}

      {/* 支付信息 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "228px",
          border: "1px solid #DDDCDE",
          borderRadius: "4px",
          gap: "24px",
          padding: "24px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "28px",
            textAlign: "left",
            color: "#02000C",
          }}
        >
          Payment details
        </Typography>
        <Box sx={{ width: "976px", borderTop: "1px solid #DDDCDE" }} />
        {detail?.payment.type === "card" ? (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "28px",
                  textAlign: "left",
                  color: "#02000C",
                }}
              >
                Credit card
              </Typography>
              {detail?.payment.brand === "visa" ? (
                <Box
                  component="img"
                  sx={{
                    width: "46px",
                    height: "24px",
                    border: "1px solid #02000C",
                    borderRadius: "4px",
                  }}
                />
              ) : (
                <Box
                  component="img"
                  sx={{
                    width: "46px",
                    height: "24px",
                    border: "1px solid #DDDCDE",
                    borderRadius: "4px",
                  }}
                />
              )}
            </Box>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                textAlign: "left",
                color: "#02000C",
              }}
            >
              {detail.payment.billingName} <br />
              Ending in {detail.payment.last4} <br />
              {detail.payment.billingAddress}
            </Typography>
          </Box>
        ) : null}
      </Box>

      <Button
        onClick={handleClickOpen}
        sx={{
          width: "193px",
          height: "48px",
          border: "1px solid #76757C",
          borderRadius: "4px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#FFFFFF",
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
            textAlign: "center",
            color: "#02000C",
          }}
        >
          Cancel Order
        </Typography>
      </Button>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "644px",
            height: "336px",
            gap: "24px",
            padding: "32px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "30px",
                  fontWeight: 700,
                  lineHeight: "40px",
                  textAlign: "left",
                  color: "#02000C",
                }}
              >
                Cancel Order?
              </Typography>
              <CloseIcon
                onClick={handleClose}
                fontSize="large"
                sx={{ color: "#02000C" }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                textAlign: "left",
                color: "#02000C",
              }}
            >
              We’re sorry to see you cancel! Currently, cancellations can only
              be processed through a phone call to ensure we securely verify
              your identity and complete the process smoothly. <br /> <br />
              Please call us at (416) 455-5673, Monday to Friday, 9 AM–10 PM,
              and our team will be happy to assist you.
            </Typography>
          </Box>
          <Button
            onClick={handleClose}
            sx={{
              width: "215px",
              height: "48px",
              border: "1px solid #76757C",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#FFFFFF",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                textAlign: "center",
                color: "#02000C",
              }}
            >
              Keep Order
            </Typography>
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Detail;
