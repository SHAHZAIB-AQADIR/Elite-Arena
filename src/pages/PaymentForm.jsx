// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// export default function PaymentForm() {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     const cardElement = elements.getElement(CardElement);

//     console.log(cardElement);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit">
//         Pay
//       </button>
//     </form>
//   );
// }




import { useState } from "react";
import './PaymentFrom.css';

export default function PaymentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://localhost:5000/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(formData.amount) * 100,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    alert("Payment Intent Created!");

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

  return (
    <div className="payment-container">
  <form className="payment-form" onSubmit={handleSubmit}>
    <h2>Payment Form</h2>

    <div className="form-group">
      <label>Full Name</label>
      <input type="text" name="name" />
    </div>

    <div className="form-group">
      <label>Email</label>
      <input type="email" name="email" />
    </div>

    <div className="form-group">
      <label>Amount ($)</label>
      <input type="number" name="amount" />
    </div>

    <button className="pay-btn" type="submit">
      Pay Now
    </button>
  </form>
</div>
  );
}