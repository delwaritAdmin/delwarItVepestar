import DHeader from "@/components/Dashboard/DHeader";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import slugify from "slugify";
// import leftmenu
import LeftMenu from "@/components/Dashboard/LeftMenu";
import useSweetAlert from "@/components/lib/sweetalert2";
import { API_TOKEN, API_URL } from "@/config/index";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import { TiDeleteOutline } from "react-icons/ti";

import http, { httpDelete } from "utils/api";

// import tailwind modal
import {
  Chip,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
} from "@material-tailwind/react";

// imports react pdf
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

// style sheet for pdf
const styles = StyleSheet.create({
  doc: {
    color: "#404B50",
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    marginVertical: "20px",
  },
  label: {
    fontSize: "12px",
    marginBottom: "6px",
  },
  input: {
    fontSize: "13px",
    color: "#000",
  },
});

function index() {
  // showing alert
  const { showAlert } = useSweetAlert();
  // loead init members
  const [orders, setOrders] = useState([]);
  // leoad search
  const [search, setSearch] = useState("");
  // set filtered members
  const [filteredOrder, setFilteredOrder] = useState([]);
  //  set single Data
  const [singleData, setSingleData] = useState("");

  const [address, setAddress] = useState({});

  const [showDetails, setShowDetails] = useState(false);

  // membershiip pdf
  const MembersPdf = () => (
    <Document>
      <Page size={"A4"} style={styles.doc}>
        <Text style={styles.header} fixed>
          {singleData.FirstName && singleData.FirstName}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 50,
            flexWrap: "wrap",
            paddingHorizontal: 20,
            marginTop: "20px",
          }}
        >
          <View>
            <Text style={styles.label} fixed>
              Title
            </Text>
            <Text style={styles.input} fixed>
              {singleData.Title && singleData.Title}
            </Text>
          </View>

          <View>
            <Text style={styles.label} fixed>
              FirstName
            </Text>
            <Text style={styles.input} fixed>
              {singleData.FirstName && singleData.FirstName}
            </Text>
          </View>
          <View>
            <Text style={styles.label} fixed>
              LastName
            </Text>
            <Text style={styles.input} fixed>
              {singleData.LastName && singleData.LastName}
            </Text>
          </View>
          <View>
            <Text style={styles.label} fixed>
              MiddleName
            </Text>
            <Text style={styles.input} fixed>
              {singleData.MiddleName && singleData.MiddleName}
            </Text>
          </View>
          <View>
            <Text style={styles.label} fixed>
              FamilyLastName
            </Text>
            <Text style={styles.input} fixed>
              {singleData.FamilyLastName && singleData.FamilyLastName}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 50,
            flexWrap: "wrap",
            paddingHorizontal: 20,
            marginTop: "20px",
          }}
        >
          <View>
            <Text style={styles.label} fixed>
              FirstName
            </Text>
            <Text style={styles.input} fixed>
              {singleData.FirstName && singleData.FirstName}
            </Text>
          </View>
          <View>
            <Text style={styles.label} fixed>
              FirstName
            </Text>
            <Text style={styles.input} fixed>
              {singleData.FirstName && singleData.FirstName}
            </Text>
          </View>
          <View>
            <Text style={styles.label} fixed>
              FirstName
            </Text>
            <Text style={styles.input} fixed>
              {singleData.FirstName && singleData.FirstName}
            </Text>
          </View>
          <View>
            <Text style={styles.label} fixed>
              FirstName
            </Text>
            <Text style={styles.input} fixed>
              {singleData.FirstName && singleData.FirstName}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  // csv headers
  const headers = [
    { label: "ID", key: "id" },
    { label: "Title", key: "attributes.Title" },
    { label: "Country", key: "attributes.Country" },
    { label: "Slug", key: "attributes.Slug" },
    { label: "ProjectDescription", key: "attributes.ProjectDescription" },
    { label: "KushInvolment", key: "attributes.KushInvolment" },
    { label: "RegistrationId", key: "attributes.RegistrationId" },
    { label: "ProjectCategorie", key: "attributes.ProjectCategorie" },
    { label: "Bradcamp", key: "attributes.Bradcamp" },
    { label: "Name", key: "attributes.Replay.Name" },
    { label: "Email", key: "attributes.Replay.Email" },
    { label: "Phone", key: "attributes.Replay.Phone" },
  ];

  // Fetch data from an external API or database

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await http.Get(`/order`);
      if (res.ok) {
        setOrders(res.data);
        setFilteredOrder(res.data);
      } else {
        console.log("hello");
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const result = orders?.filter((order) =>
      order.orderId.toLowerCase().match(search.toLowerCase())
    );
    setFilteredOrder(result);
  }, [search]);

  // handle status change
  const handleStatus = async (status, data) => {
    showAlert({
      text: "Do you want to save the changes?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Yes",
      // denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (!result?.isConfirmed) return;

      const { _id: id } = data;

      const res = await http.httpPut(`/order/${id}`, { status });

      if (!res.ok) return;

      showAlert({
        icon: "success",
        text: "Status Successfully Changed!",
        showConfirmButton: false,
        timer: 1000,
      });
    });
  };

  const handleDelete = async (data) => {

    showAlert({
      text: "Do you want to Delete?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Yes",
      // denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (!result?.isConfirmed) return;

      const res = await httpDelete(`/order/${data?._id}`);

      if (!res.ok) return;

      showAlert({
        icon: "success",
        title: "Status Successfully Deleted!",
        showConfirmButton: false,
        timer: 1000,
      });
    });


  };

  // table columns
  const columns = [
    {
      name: "Order Id",
      selector: (row) => row.orderId,
      sortable: true,
    },
    // {
    //   name: "Customer",
    //   selector: "raabbi",
    //   sortable: true,
    // },
    {
      name: "Product Details",
      cell: (row) => (
        <div className=" grid my-2 justify-between items-center xl:grid-cols-3 grid-cols-1 gap-2">
          <Chip
            value="view"
            color="green"
            className=" cursor-pointer  lowercase "
            onClick={() => handleShowProduct(row)}
          />
        </div>
      ),
    },
    {
      name: "Delevary Price",
      selector: (row) => `${row.totalPrice}$`,
      sortable: true,
    },
    {
      name: "Shipping Details",
      cell: (row) => (
        <div className=" grid my-2 justify-between items-center xl:grid-cols-3 grid-cols-1 gap-2">
          <Chip
            value="view"
            color="indigo"
            className=" cursor-pointer  lowercase "
            onClick={() => handleAddress(row.shippingDetails)}
          />
        </div>
      ),
    },
    {
      name: "Shipping Details",
      cell: (row) => (
        <div className=" grid my-2 justify-between items-center xl:grid-cols-3 grid-cols-1 gap-2">
          <Chip
            value="view"
            color="teal"
            className=" cursor-pointer  lowercase "
            onClick={() => handleAddress(row.billingDetails)}
          />
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <select
          required
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-state"
          onChange={(status) => handleStatus(status.target.value, row)}
        >
          <option defaultChecked>pending</option>
          <option>processing</option>
          <option>shipped</option>
          <option>delivered</option>
        </select>
      ),
      selector: "selected",
      sortable: false,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className=" grid my-2 justify-between items-center xl:grid-cols-3 grid-cols-1 gap-2">
          <Chip
            value="Delete"
            className=" cursor-pointer bg-red  lowercase "
            onClick={() => handleDelete(row)}
          />
        </div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        backgroundColor: "#fff",
        fontSize: "14px",
        color: "#333",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#F9FAFB",
        boxShadow: "none",
        fontSize: "14px",
        fontWeight: "bold",
        color: "#374151",
        textTransform: "uppercase",
      },
    },
  };

  // show products

  const [showProduct, setShowProduct] = useState(false);

  const handleShowProduct = (data) => {
    setSingleData(data);
    setShowProduct(true);
  };

  const handleAddress = (data) => {
    setAddress(data);
    setShowDetails(true);
  };

  return (
    <>
      <Head>
        <title>Project</title>
      </Head>
      <div className="grid  px-10 grid-cols-1 lg:grid-cols-5 gap-6 justify-items-left p-[3rem] ">
        <DHeader />
        <LeftMenu />

        <div className=" grid grid-cols-1 mt-[6rem] 2xl:grid-cols-3 gap-y-2 gap-2 lg:col-span-4 gap-x-5">
          <div className=" mr-10  2xl:col-span-3  2xl:order-2">
            <DataTable
              columns={columns}
              data={filteredOrder}
              // selectableRowsHighlight
              // highlightOnHover
              // selectableRows
              fixedHeader
              title="Orders Table"
              subHeader
              subHeaderComponent={
                <div className="relative mb-6 mt-4  shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-[#6B7280] dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="simple-search"
                    className="   bg-[#F9FAFB] border  border-softGray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              }
              customStyles={customStyles}
              subHeaderAlign="center"
              pagination
              actions={
                <div className="flex justify-between mb-4 items-center space-x-2">
                  <CSVLink
                    data={orders}
                    headers={headers}
                    filename={"Invest-data.csv"}
                  >
                    <Chip
                      value="Download"
                      className=" cursor-pointer   capitalize shadow-md active:shadow-sm text-base  "
                    />
                  </CSVLink>

                  <CSVLink
                    data={orders}
                    headers={headers}
                    filename={"Volunteers-data.csv"}
                  >
                    <Chip
                      color="amber"
                      value=" Download CSV"
                      className=" cursor-pointer   capitalize shadow-md active:shadow-sm text-base  "
                    />
                  </CSVLink>

                  <Chip
                    color="indigo"
                    value="Pdf"
                    className=" cursor-pointer   capitalize shadow-md active:shadow-sm text-base  "
                  />

                  <Chip
                    color="purple"
                    value="Share"
                    className=" cursor-pointer   capitalize shadow-md active:shadow-sm text-base  "
                  />
                </div>
              }
            />
          </div>
        </div>

        {/* // tailwind modal  */}

        <Dialog open={showProduct}>
          <DialogHeader className="  flex justify-end">
            <TiDeleteOutline
              className=" text-[1.5rem]   cursor-pointer"
              onClick={() => setShowProduct(false)}
            />
          </DialogHeader>

          <DialogBody>
            <div
              className="grid grid-cols-1 md:grid-cols-2  max-h-[80vh]   
            overflow-y-auto 
            justify-items-center
            gap-8 
          "
            >
              {singleData?.items?.map((product, index) => (
                <div
                  key={index}
                  className="
                  
                  gap-2 
                
                   bg-blue-gray-50 shadow-md  p-3 py-4 rounded-sm
                  justify-items-center
                grid grid-cols-1"
                >
                  <Image
                    src={product.productId.imgUrl}
                    alt="img"
                    height={100}
                    width={100}
                  />

                  <h1>
                    Name :
                    <span className="font-bold text-black">
                      {product.productId.name}
                    </span>
                  </h1>

                  <h1>
                    Flavour :
                    <span className="font-bold text-black">
                      {product.flavour}
                    </span>
                  </h1>
                  <h1>
                    Quantity:
                    <span className="font-bold text-black">
                      {product.quantity}
                    </span>
                  </h1>
                  <h1>
                    Price :
                    <span className="font-bold text-black">
                      {product.price}
                    </span>
                  </h1>
                </div>
              ))}
            </div>
          </DialogBody>
        </Dialog>

        <Dialog open={showDetails}>
          <DialogHeader className="  flex justify-end">
            <TiDeleteOutline
              className=" text-[1.5rem]   cursor-pointer"
              onClick={() => setShowDetails(false)}
            />
          </DialogHeader>

          <DialogBody>
            <div className=" grid-cols-1 lg:grid-cols-2  grid gap-5 xl:grid-cols-3 ">
              <div>
                <label className="block font-bold ">FirstName</label>
                <Input label={address.firstName} disabled />
              </div>

              <div>
                <label className="block font-bold ">LastName</label>
                <Input label={address.lastName} disabled />
              </div>

              <div>
                <label className="block font-bold ">companyName</label>
                <Input label={address.companyName} disabled />
              </div>

              <div>
                <label className="block font-bold ">streetAddress</label>
                <Input label={address.streetAddress} disabled />
              </div>
              <div>
                <label className="block font-bold ">city</label>
                <Input label={address.city} disabled />
              </div>
              <div>
                <label className="block font-bold ">phone</label>
                <Input label={address.phone} disabled />
              </div>
              <div>
                <label className="block font-bold ">email</label>
                <Input label={address.email} disabled />
              </div>
            </div>
          </DialogBody>
        </Dialog>
      </div>
    </>
  );
}

export default index;
