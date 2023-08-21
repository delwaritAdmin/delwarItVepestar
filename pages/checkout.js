import React, { useEffect, useState, useContext } from "react";
import ShopLayout from "@/components/ShopPage/Layout/Layout";
import Header from "@/components/HomePage/Header";
import { Button, Checkbox } from "@material-tailwind/react";
import { CartContext } from "@/context/cartContext";
import http from "utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const init = {
  firstName: "",
  lastName: "",
  companyName: "",
  streetAddress: "",
  city: "",
  phone: "",
  email: "",
};

function checkout() {
  const route = useRouter();

  const { data: session, status } = useSession();

  let total = 0;

  const { data } = useContext(CartContext);

  const [orderId, setOrderId] = useState("");

  const [items, setItems] = useState([]);
  const [isFatching, setIsFatching] = useState(false);

  const [same, setSame] = useState(true);
  const [billing, setBilling] = useState(init);
  const [shipping, setShipping] = useState(init);

  const handleGenerateOrderId = () => {
    const newNumber = Math.floor(Math.random() * 100000000);
    const paddedNumber = newNumber.toString().padStart(8, "0");
    setOrderId(paddedNumber);
  };

  useEffect(() => {
    if (data) {
      const item = data?.data.items.map((data) => {
        return {
          productId: data.product._id,
          quantity: data.quantity,
          price: 500,
          flavour: data.flavour,
        };
      });
      setItems(item);
    }
  }, [data]);

  const handleSameAddress = (e) => {
    setSame(!same);
  };

  useEffect(() => {
    handleGenerateOrderId();

    if (same) {
      setShipping({ ...billing });
    }
  }, [billing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "authenticated") {
      let data = {
        orderId,
        userId: session?.user?._id,
        billingDetails: billing,
        shippingDetails: shipping,
        items,
        totalPrice: total,
      };

      setIsFatching(true);

      const res = await http.httpPost(`/order`, data);

      const mailData = {
        email: "vapestart507@gmail.com",
        subject: "You Have a New Order",
        message: `the order id is : ${orderId},  Order Price: ${total}د.إ, Customer Email: ${session?.user?.email}`,
      };

      await http.httpPost("/email/sendmail", mailData);

      if (res.ok) {
        setIsFatching(false);
        route.push("/thankyou");
        return;
      }
    } else {
      setIsFatching(false);
      route.push("/my-account");
    }
  };

  return (
    <div>
      <Header />
      <ShopLayout>
        <form onSubmit={handleSubmit}>
          <div className="checkout bg-[#1F1F1F]  h-full w-full">
            <div className="wrapper grid sm:grid-cols-1 gap-x-6 md:grid-cols-2 p-5">
              {/* details */}
              <div className="grid grid-cols-1">
                {/* Billing Details */}
                <div>
                  <h1 className="text-primary font-bold text-[1.5rem]">
                    Billing details
                  </h1>

                  <div className=" grid  grid-cols-2 gap-10">
                    <div className="mt-4">
                      <label
                        className="block mb-2  text-softGray"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        onChange={(e) =>
                          setBilling({ ...billing, firstName: e.target.value })
                        }
                        placeholder="first name"
                        required
                        className="p-2 w-full px-4 rounded-sm"
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        className="block mb-2  text-softGray"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        onChange={(e) =>
                          setBilling({ ...billing, lastName: e.target.value })
                        }
                        placeholder="last name"
                        required
                        className="p-2 w-full px-4 rounded-sm"
                      />
                    </div>
                  </div>
                  <div className=" grid  grid-cols-1">
                    <div className="mt-4">
                      <label
                        className="block mb-2  text-softGray"
                        htmlFor="companyName"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        onChange={(e) =>
                          setBilling({
                            ...billing,
                            companyName: e.target.value,
                          })
                        }
                        id="companyName"
                        placeholder="company"
                        required
                        className="p-2 w-full px-4 rounded-sm"
                      />
                    </div>
                  </div>
                  <div className=" grid  grid-cols-1">
                    <div className="mt-4">
                      <label
                        className="block mb-2  text-softGray"
                        htmlFor="house"
                      >
                        Street address *
                      </label>
                      <input
                        type="text"
                        id="house"
                        onChange={(e) =>
                          setBilling({
                            ...billing,
                            streetAddress: e.target.value,
                          })
                        }
                        placeholder="house number and street name"
                        required
                        className="p-2 w-full px-4 rounded-sm"
                      />
                    </div>
                  </div>

                  <div className=" grid  grid-cols-1">
                    <div className="mt-4">
                      <label
                        className="block mb-2  text-softGray"
                        htmlFor="companyName"
                      >
                        Town / City *
                      </label>
                      <input
                        onChange={(e) =>
                          setBilling({ ...billing, city: e.target.value })
                        }
                        type="text"
                        id="companyName"
                        placeholder="company"
                        required
                        className="p-2 w-full px-4 rounded-sm"
                      />
                    </div>
                  </div>

                  <div className=" grid  grid-cols-1">
                    <div className="mt-4">
                      <label
                        className="block mb-2  text-softGray"
                        htmlFor="companyName"
                      >
                        Phone *
                      </label>
                      <input
                        onChange={(e) =>
                          setBilling({ ...billing, phone: e.target.value })
                        }
                        type="number"
                        id="companyName"
                        placeholder="company"
                        required
                        className="p-2 w-full px-4 rounded-sm"
                      />
                    </div>
                  </div>

                  <div className=" grid  grid-cols-1">
                    <div className="mt-4">
                      <label
                        className="block mb-2  text-softGray"
                        htmlFor="companyName"
                      >
                        Email address *
                      </label>
                      <input
                        onChange={(e) =>
                          setBilling({ ...billing, email: e.target.value })
                        }
                        type="email"
                        id="companyName"
                        placeholder="company"
                        required
                        className="p-2 w-full px-4 rounded-sm"
                      />
                    </div>
                  </div>
                </div>
                {/* Shiping Details */}

                <div className="mt-5">
                  <Checkbox
                    onClick={handleSameAddress}
                    defaultChecked
                    className="   text-red text-[1rem]"
                    label="Ship to a different address?"
                  />

                  {!same ? (
                    <form>
                      <div className=" grid  grid-cols-2 gap-10">
                        <div className="mt-4">
                          <label
                            className="block mb-2  text-softGray"
                            htmlFor="firstName"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            onChange={(e) =>
                              setShipping({
                                ...shipping,
                                firstName: e.target.value,
                              })
                            }
                            placeholder="first name"
                            required
                            className="p-2 w-full px-4 rounded-sm"
                          />
                        </div>
                        <div className="mt-4">
                          <label
                            className="block mb-2  text-softGray"
                            htmlFor="lastName"
                          >
                            Last Name
                          </label>
                          <input
                            onChange={(e) =>
                              setShipping({
                                ...shipping,
                                lastName: e.target.value,
                              })
                            }
                            type="text"
                            id="lastName"
                            placeholder="last name"
                            required
                            className="p-2 w-full px-4 rounded-sm"
                          />
                        </div>
                      </div>
                      <div className=" grid  grid-cols-1">
                        <div className="mt-4">
                          <label
                            className="block mb-2  text-softGray"
                            htmlFor="companyName"
                          >
                            Company Name
                          </label>
                          <input
                            onChange={(e) =>
                              setShipping({
                                ...shipping,
                                companyName: e.target.value,
                              })
                            }
                            type="text"
                            id="companyName"
                            placeholder="company"
                            required
                            className="p-2 w-full px-4 rounded-sm"
                          />
                        </div>
                      </div>
                      <div className=" grid  grid-cols-1">
                        <div className="mt-4">
                          <label
                            className="block mb-2  text-softGray"
                            htmlFor="house"
                          >
                            Street address *
                          </label>
                          <input
                            onChange={(e) =>
                              setShipping({
                                ...shipping,
                                streetAddress: e.target.value,
                              })
                            }
                            type="text"
                            id="house"
                            placeholder="house number and street name"
                            required
                            className="p-2 w-full px-4 rounded-sm"
                          />
                        </div>
                      </div>

                      <div className=" grid  grid-cols-1">
                        <div className="mt-4">
                          <label
                            className="block mb-2  text-softGray"
                            htmlFor="companyName"
                          >
                            Town / City *
                          </label>
                          <input
                            onChange={(e) =>
                              setShipping({ ...shipping, city: e.target.value })
                            }
                            type="text"
                            id="companyName"
                            placeholder="company"
                            required
                            className="p-2 w-full px-4 rounded-sm"
                          />
                        </div>
                      </div>

                      <div className=" grid  grid-cols-1">
                        <div className="mt-4">
                          <label
                            className="block mb-2  text-softGray"
                            htmlFor="companyName"
                          >
                            Phone *
                          </label>
                          <input
                            onChange={(e) =>
                              setShipping({
                                ...shipping,
                                phone: e.target.value,
                              })
                            }
                            type="number"
                            id="companyName"
                            placeholder="company"
                            required
                            className="p-2 w-full px-4 rounded-sm"
                          />
                        </div>
                      </div>

                      <div className=" grid  grid-cols-1">
                        <div className="mt-4">
                          <label
                            className="block mb-2  text-softGray"
                            htmlFor="companyName"
                          >
                            Email address *
                          </label>
                          <input
                            onChange={(e) =>
                              setShipping({
                                ...shipping,
                                email: e.target.value,
                              })
                            }
                            type="email"
                            id="companyName"
                            placeholder="company"
                            required
                            className="p-2 w-full px-4 rounded-sm"
                          />
                        </div>
                      </div>
                    </form>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/* amount details */}
              <div className="px-5">
                <h1 className="   text-primary text-[1.5rem] font-bold">
                  Your Order
                </h1>

                <div className=" products mt-10">
                  <div
                    className=" heading flex justify-between  border-b border-primary  pb-8
                "
                  >
                    <h1 className=" text-primary font-bold">Products</h1>
                    <h1 className=" text-primary font-bold">Subtotoal</h1>
                  </div>

                  {data?.data.items.map((data) => (
                    <div className=" heading flex justify-between mt-5">
                      <div>
                        <span className=" hidden">
                          {(total += data.quantity * data.product.price)}
                        </span>
                        <h1 className=" text-white  font-bold">
                          {data.product.name}
                        </h1>
                      </div>
                      <div>
                        <h1 className=" text-white  font-bold">
                          {data.quantity * data.product.price} د.إ
                        </h1>
                      </div>
                    </div>
                  ))}

                  {/* shiping charge */}
                  {total >= 300 ? (
                    ""
                  ) : (
                    <div className=" mt-4 border  p-4 text-white">
                      <div className="flex justify-between">
                        <div>
                          <h1>Shipping Charge</h1>
                        </div>

                        <div className="p-5   bg-[#1f1f1f] border ">
                          <p className="font-bold">
                            {" "}
                            Cash On Delivary{" "}
                            <span className="text-primary">د.إ25</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between mt-5">
                        <div>
                          <h1>Total</h1>
                        </div>

                        <div>
                          <p className="font-bold">
                            <span className="text-primary">
                              {total >= 300 ? total : total + 25}د.إ
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <Button
                      disabled={isFatching}
                      type="submit"
                      className="bg-primary w-full mt-10 rounded-sm"
                    >
                      {isFatching ? "loading.." : "  Place Order"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ShopLayout>
    </div>
  );
}

export default checkout;
