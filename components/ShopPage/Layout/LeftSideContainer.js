import { useState, useContext } from "react";
import { BiMenu } from "react-icons/bi";
import Link from "next/link";
import { BsArrowUpShort } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import http from "utils/api";
import Image from "next/image";
import { useQuery } from "react-query";
import { BulletList } from "react-content-loader";
import p1 from "../../../img/p1.jpg";
import { useRouter } from "next/router";
import { CartContext } from "@/context/cartContext";

function LeftSideContainer() {
  
  const { data: carts } = useContext(CartContext);

  const [open, setOpen] = useState(true);

  const [relatedProducts, setRelatedProducts] = useState(true);

  const router = useRouter();

  const { data, isLoading, isError } = useQuery("myData", fetchData);

  let price = 0;

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <section
        className="lg:col-span-3
    transition-all duration-500 
    lg:order-1 md:order-2 order-2"
      >
        {/* category */}
        <div className="cetegory rounded-sm">
          <div
            className="cetetogy__pannel bg-primary p-3  text-white cursor-pointer"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <div className="pannel__header">
              {/* header section */}

              <div className=" flex justify-between">
                <div className="flex space-x-3 items-center">
                  <BiMenu className="  text-white  text-[1.5rem]" />
                  <span className=" font-eco font-bold text-[1.2rem]">
                    Cetegory
                  </span>
                </div>
                <BsArrowUpShort className="text-[1.5rem]" />
              </div>
            </div>
          </div>

          <div
            className={` bg-[#292929] 
        
     overflow-hidden text-white  font-eco font-bold
     ${open ? `py-2 ` : `h-0`}

        `}
          >
            <ul className={`p-2 space-y-4  ml-2 uppercase`}>
              {isLoading ? (
                <BulletList animate={true} />
              ) : (
                data.map((category, index) => (
                  <Link
                    className=" block"
                    key={index}
                    href={`/product-category/${category.slug}`}
                  >
                    <li className=" hover:text-primary text-white">
                      {category.name}
                    </li>
                  </Link>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* related products */}
        <div className="related__products mt-5 rounded-sm">
          <div
            className="cetetogy__pannel bg-primary p-3  text-white cursor-pointer"
            onClick={() => {
              setRelatedProducts(!relatedProducts);
            }}
          >
            <div className="pannel__header">
              {/* header section */}

              <div className=" flex justify-between">
                <div className="flex space-x-3 items-center">
                  <BiMenu className="  text-white  text-[1.5rem]" />
                  <span className=" font-eco font-bold text-[1.2rem]">
                    Related Products
                  </span>
                </div>
                <BsArrowUpShort className="text-[1.5rem]" />
              </div>
            </div>
          </div>

          <div
            className={` bg-[#292929] 
        
     overflow-hidden text-white  font-eco font-bold
     ${relatedProducts ? `py-2  ` : `h-0`}


        `}
          >
            <div>
              {/* Realted Products */}
              <div className=" relatedProduct__wrapper p-4 flex space-x-5">
                <div>
                  <Image
                    className=" rounded-sm"
                    src={p1}
                    width={50}
                    height={50}
                    alt="product image"
                  />
                </div>
                <div>
                  <p>Product Title Is Here</p>

                  <div className="flex ext-sm   space-x-3">
                    <p className="  text-softGray line-through font-bold">
                    د.إ<span className="text-[1rem]">26.99</span>
                    </p>
                    <p className="text-yeollow  font-bold">
                    د.إ<span className="text-[1rem]">26.99</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className=" relatedProduct__wrapper p-4 flex space-x-5">
                <div>
                  <Image
                    className=" rounded-sm"
                    src={p1}
                    width={50}
                    height={50}
                    alt="product image"
                  />
                </div>
                <div>
                  <p>Product Title Is Here</p>

                  <div className="flex ext-sm   space-x-3">
                    <p className="  text-softGray line-through font-bold">
                    د.إ<span className="text-[1rem]">26.99</span>
                    </p>
                    <p className="text-yeollow  font-bold">
                    د.إ<span className="text-[1rem]">26.99</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className=" relatedProduct__wrapper p-4 flex space-x-5">
                <div>
                  <Image
                    className=" rounded-sm"
                    src={p1}
                    width={50}
                    height={50}
                    alt="product image"
                  />
                </div>
                <div>
                  <p>Product Title Is Here</p>

                  <div className="flex ext-sm   space-x-3">
                    <p className="  text-softGray line-through font-bold">
                    د.إ<span className="text-[1rem]">26.99</span>
                    </p>
                    <p className="text-yeollow  font-bold">
                    د.إ<span className="text-[1rem]">26.99</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className=" relatedProduct__wrapper p-4 flex space-x-5">
                <div>
                  <Image
                    className=" rounded-sm"
                    src={p1}
                    width={50}
                    height={50}
                    alt="product image"
                  />
                </div>
                <div>
                  <p>Product Title Is Here</p>

                  <div className="flex ext-sm   space-x-3">
                    <p className="  text-softGray line-through font-bold">
                      د.إ<span className="text-[1rem]">26.99</span>
                    </p>
                    <p className="text-yeollow  font-bold">
                      د.إ<span className="text-[1rem]">26.99</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* cart */}
        {router.pathname === "/cart"  ? (
          ""
        ) : (
          <div className="cart mt-5 bg-matBlack text-white p-4 rounded-sm">
            <div className="cart__container">
              <h1 className="cart__heading text-[1.5rem]">Cart</h1>

              <div className="cart__products">
                {/* proudcts */}

                {carts &&
                  carts?.data.items?.map((data) => (
                    <div className=" cartProduct__wrapper p-4 flex justify-between ">
                      <div className="flex space-x-5">
                        <div>
                          <Image
                            className=" rounded-sm"
                            src={data?.product?.imgUrl}
                            width={50}
                            height={50}
                            alt="product image"
                          />
                        </div>
                        <spna className=" hidden">
                          {(price += data?.quantity * data?.product?.price)}
                        </spna>
                        <div>
                          <p>{data?.product?.name}</p>

                          <div className="flex ext-sm   space-x-3">
                            <p className="  text-softGray  font-bold">
                              <span className="text-[1rem]">
                                {data?.quantity} *
                              </span>
                            </p>
                            <p className="text-yeollow  font-bold">
                            د.إ
                              <span className="text-[1rem]">
                                {data?.product?.price}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <AiOutlineCloseCircle className=" cursor-pointer  " />
                    </div>
                  ))}
              </div>

              <hr className=" w-full h-1 mx-auto  bg-blue-gray-200 border-0 rounded my-2 "></hr>

              <div className="calculations  ">
                <p className="mb-1">
                  <span>
                    Subtotal: <span className="font-bold">{price}</span>
                  </span>
                </p>
                <div className="buttons flex  space-x-5">
                  <Link
                    href={`/cart`}
                    className="text-white font-bold py-1 px-4  rounded-md   bg-primary  block"
                  >
                    View Cart
                  </Link>
                  <Link
                    href={`/checkout`}
                    className=" p-1  px-4 rounded-md   bg-primary text-white font-bold   block"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

async function fetchData() {
  const response = await http.GetById(`/category`);

  return response.data;
}

export default LeftSideContainer;
