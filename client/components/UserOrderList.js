import React from 'react'
import {connect} from 'react-redux'
import {fetchUserOrders} from '../store'
import {Link} from 'react-router-dom'

export class UserOrderList extends React.Component {

  componentDidMount () {
    console.log('****', this.props.user.id)
    this.props.getUserOrders(this.props.user.id)
  }

  render () {
    console.log('----->', this.props)
    const {orders} = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="page-header">
              <h1><small className="pull-right">{orders.length} orders</small> Orders </h1>
            </div>
            <div className="row">
              <div className="span5">
                {
                  orders.map(order =>
                    <table key={order.id} className="table table-striped table-condensed">
                      <thead>
                        <tr>
                          <th>Order ID: {order.id}</th>
                          <th>Ship Date: {order.shipdate.slice(0, 10)}</th>
                          <th>Delivery Date: {order.deliverydate.slice(0, 10)}</th>
                          <th>Status: {order.status}</th>
                        </tr>
                      </thead>
                      {
                        order.chocolates.map(chocolate =>
                          <tbody key={chocolate.id}>
                            <tr>
                              <th>Product ID: {chocolate.id}</th>
                              <th><Link to={`/products/${chocolate.id}`}>Name: {chocolate.name}</Link> </th>
                              <th><img src={chocolate.photo} className="img-rounded" alt="Cinque Terre" width="20%" /></th>
                              <th>Quantity: {chocolate.chocolateOrder.quantity}</th>
                              <th>Total: {chocolate.chocolateOrder.totalPrice}</th>
                            </tr>
                          </tbody>
                        )
                      }
                    </table>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  console.log('userOrderList state---- >', state)
  return {
    orders: state.orders,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUserOrders: (id) => {
      dispatch(fetchUserOrders(id))
    }
  }
}

export default connect(mapState, mapDispatch)(UserOrderList)
