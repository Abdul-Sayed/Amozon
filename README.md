# Amozon

## Amazon web app, using NextJS, React, Redux Toolkit, Redux Persist, NextAuth, Stripe, Amazon API (RapidAPI),Fakestore API, Webhooks, Tailwind, Responsive-Carousel, Hero-Icons

`API: https://real-time-amazon-data.p.rapidapi.com/search`

### Pages and Routes

```
Index
|
├──Header.js <==> routes to search and checkout pages
|
├───ProductFeed.js
|   └───Product.js <==> routes to local-listings page
|
└───Banner.js

Checkout
|
├──Header.js <==> routes to search and checkout pages
└──Checkout.js
   └───CheckoutProduct.js <==> routes to local-listings page

Success.js <==> routes to Orders page

Orders
|
├──Header.js <==> routes to search and checkout pages
|
└───Order.js

Search
|
├──Header.js <==> routes to search and checkout pages
|
├───ProductFeed.js
|   └───Product.js <==> routes to local-listings page
|
└───Banner.js
```

#### Index Page

Route="/"

> The root of the application is the index page.
> Renders the Header, Banner, and ProductFeed components.
> It makes a GET request to "https://fakestoreapi.com/products" inside getStaticProps and passes those products to ProductFeed component.

##### Header

> Renders a navbar with an Amazon logo which links to the homepage, a product search input, the cart icon, and some links.
> Upon clicking on the cart icon, the checkout page is routed to. The number of items in the cart is read from state, and displayed next to the cart icon.
> If the user is logged in, a greeting with the user's name appears, as well as a link to the orders page. Clicking on the user's name opens a popup to sign out.
> Upon entering a search term in the input, the search page is navigated to, with the search term as a query parameter.

##### Banner

> Renders a carousel of banner images.

##### ProductFeed

> Recieves products prop from index or search pages and renders the Product component for each product, passing in the id, title, price, description, category, image, and rating

##### Product

> Recieves props from ProductFeed component and renders them. Clicking the Add to Cart button saves the product object to state via the addToCart reducer function. The hasPrime field is created after the component mounts to prevent react hydration errors.

#### Checkout Page

Route = "/checkout"

> Recieves the cart items from state, renders the Header and, if there are items in the cart, CheckoutProduct components.
> Reads the number of items and total from state, and renders that on the right.
> If the user is signed in, it allows the user to checkout, otherwise the user is prompted to sign in. Upon clicking checkout, a post request is made to the create-checkout-session api route, passing in the cart items, total, user, and numItems into the body

##### CheckoutProduct

> Recieves id, title, price, category, description, image, quantity, rating, hasPrime props from the checkout page, and renders the product. Has a delete button that calls the removeFromCart reducer function, passing in the product's id.

#### Create-Checkout-Session API Page

Route="/create-checkout-session"

> Recieves items, total, user, numItems from request.body, and creates a stripe checkout session, passing in that data. The user is sent to the stripe checkout page for completing the order. Upon successful completion, the user is returned to the application and routed to the success page. If the user cancels, the user is sent to the '/cancel" route, which redirects to the home page, as configured in next.config

#### Success Page

Route="/success"

> Renders order confirmation text and a button to route to the Orders Page. Also clears the cart by dispatching the emptyCart() reducer function.

#### Orders Page

Route="/orders"

> If the user is authenticated, within getServerSideProps the Stripe sessions api is called to obtain all the orders from the current user.
> If the user is authenticated, an Order component is renderedfor each order, passing in the order details.
> If the user is not authenticated, the user is prompted to sign in.

##### Order

> Recieves the order id, amount, shipping amount, numItems, timestamp, and images of all the order items as props and renders the order info.

#### Search Page

Route="/search"

> Renders the Header, Banner, and ProductFeed components.
> It recieves the search term from query params.
> It makes a GET request to "https://real-time-amazon-data.p.rapidapi.com/search" inside getServerSideProps and passes those products to the ProductFeed component.

#### Next Auth config

> In 'pages/api/auth/[...nextauth].js', Google and Github were configured as the OAuth Providers

#### State

> 'state/store.js' configures the use of the reducer in 'state/slices/cartSlice.js', as well as configures redux persist so that the cart state is saved after a page refresh, as can occur when signing in.
