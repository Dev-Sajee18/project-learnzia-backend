import express from 'express';
const router = express. Router();
import { v4 as uuidv4 } from "uuid"
import stripe from "stripe";

const stripeInstance = stripe("sk_test_51OsfJmRtWsi1gN3bSnVBi46tJAK5Da2h0y1WeWjnjArrKCmz01YjYOEggkUXXXrkrCYnlTUbxjZv5HG1eZAngHhY00RJYUkzM5");
// POST endpoint for making a payment
router.post("/payment", (req, res) => {
    const { product, token } = req.body;
    const transactionKey = uuidv4();
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then((customer) => {
        stripe.charges.create({
            amount: product.price,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
            description: product.name
        }).then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: "An error occurred while processing the payment." });
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "An error occurred while creating customer." });
    });
});
// GET endpoint for retrieving all payments
router.get("/payments", (req, res) => {
    stripe.charges.list(
        { limit: 10 }, // Adjust the limit as per your requirements
        (err, charges) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "An error occurred while fetching payments." });
            }
            res.json(charges);
        }
    );
});
export default router;









