import React, { Fragment, useEffect} from "react";
import "./myOrders.css"
import { useSelector, useDispatch } from "react-redux";
import Metadata from "../layout/Metadata";
import Loader from '../layout/Loader/loader.jsx';
import { Link} from "react-router-dom";
import { toast } from 'react-toastify';
import { clearErrors, myOrders } from "../../actions/orderAction";
import LaunchIcon from '@mui/icons-material/Launch';
import { DataGrid } from '@mui/x-data-grid';

const MyOrders = () => {
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);
    const columns = [
      { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
      {
        field: "status",
        headerName: "Status",
        minWidth: 150,
        flex: 0.5,
        cellClassName: (params) => {
          return params.value === "Delivered"
            ? "greenColor"
            : "redColor";
        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 150,
        flex: 0.3,
      },
      {
        field: "amount",
        headerName: "Amount",
        type: "number",
        minWidth: 270,
        flex: 0.5,
      },
      {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Link to={`/order/${params.row.id}`}>
              <LaunchIcon />
            </Link>
          );
        },
      },
    ];

    const rows = [];

    orders &&
      orders.forEach((item, index) => {
        rows.push({
          itemsQty: item.orderItems.length,
          id: item._id,
          status: item.orderStatus,
          amount: item.totalPrice,
        });
      });
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearErrors());
      }
      dispatch(myOrders());
    }, [dispatch,  error]);
  
    return (
      <Fragment>
        <Metadata title={`${user && user.name} - Orders`} />
        {loading ? (
          <Loader />
        ) : (
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />
            <h2 className="h22" id="myOrdersHeading">{user.name}'s Orders</h2>
          </div>
        )}
      </Fragment>
    );
  };
  
  export default MyOrders;