if (!localStorage.getItem("adminToken")) {
    window.location.href = "admin-login.html";
}

async function loadOrders() {
    try {
        const response = await fetch("http://localhost:5000/api/orders", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("adminToken")
            }
        });
        const data = await response.json();
        
        const tbody = document.getElementById("orders-table-body");
        tbody.innerHTML = "";
        
        if (data.orders && data.orders.length > 0) {
            data.orders.forEach(function(order) {
                const row = document.createElement("tr");
                row.innerHTML = "<td>#" + order.id + "</td>" +
                    "<td>" + order.customer_name + "</td>" +
                    "<td>" + order.customer_phone + "</td>" +
                    "<td>$" + order.total + "</td>" +
                    "<td><span class='status-badge status-" + order.status + "'>" + order.status + "</span></td>" +
                    "<td>" + new Date(order.created_at).toLocaleDateString() + "</td>" +
                    "<td><select onchange='updateStatus(" + order.id + ", this.value)'>" +
                    "<option value='pending'" + (order.status === "pending" ? " selected" : "") + ">Pending</option>" +
                    "<option value='preparing'" + (order.status === "preparing" ? " selected" : "") + ">Preparing</option>" +
                    "<option value='ready'" + (order.status === "ready" ? " selected" : "") + ">Ready</option>" +
                    "<option value='delivered'" + (order.status === "delivered" ? " selected" : "") + ">Delivered</option>" +
                    "</select></td>";
                tbody.appendChild(row);
            });
        } else {
            tbody.innerHTML = "<tr><td colspan='7'>No orders found</td></tr>";
        }
    } catch (error) {
        console.error("Error loading orders:", error);
    }
}

async function updateStatus(orderId, status) {
    try {
        await fetch("http://localhost:5000/api/orders/" + orderId + "/status", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("adminToken")
            },
            body: JSON.stringify({ status: status })
        });
        loadOrders();
    } catch (error) {
        console.error("Error updating status:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadOrders);
