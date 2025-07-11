import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const POST = async (req: NextRequest) => {
  try {
    const { customer, items, totalPrice } = await req.json()

    // Send email to admin
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email provider
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL, // admin email
      subject: 'New Order Received',
      html: `
        <h2>New Order</h2>
        <p><b>Name:</b> ${customer.fullname}</p>
        <p><b>Address:</b> ${customer.address}</p>
        <p><b>Phone:</b> ${customer.phone}</p>
        <p><b>Notes:</b> ${customer.notes}</p>
        <h3>Products:</h3>
        <ul>
          ${items.map((item: any) => `<li>${item.name} x${item.quantity} - $${item.price}</li>`).join('')}
        </ul>
        <p><b>Total Price:</b> $${totalPrice}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    // Optionally: Save order to DB or Redis here

    return NextResponse.json({ message: 'Order placed successfully' }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 })
  }
}