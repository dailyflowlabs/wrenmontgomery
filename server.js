const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables (.env.local, then .env if present)
if (fs.existsSync(path.join(__dirname, '.env.local'))) {
  dotenv.config({ path: path.join(__dirname, '.env.local') });
} else {
  dotenv.config();
}

const Stripe = require('stripe');
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
const PRINTIFY_TOKEN = process.env.PRINTIFY_TOKEN;
const PRINTIFY_SHOP_ID = process.env.PRINTIFY_SHOP_ID || '';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Helper: load products catalog
function getProductsCatalog() {
  const filePath = path.join(__dirname, 'data', 'products.json');
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (e) {
      console.error('Error parsing products.json:', e);
    }
  }
  return [];
}

// --------------------------------------------------------------------------
// API: Products Catalog
// --------------------------------------------------------------------------
app.get('/api/merch/products', (req, res) => {
  res.json(getProductsCatalog());
});

// --------------------------------------------------------------------------
// API: Merch Checkout (Stripe Checkout Session)
// --------------------------------------------------------------------------
app.post('/api/merch/checkout', async (req, res) => {
  try {
    const { productId, variantId, quantity = 1 } = req.body;

    if (!stripe) {
      return res.status(503).json({ error: 'Checkout is currently in preview mode. Stripe is not yet configured.' });
    }

    if (!productId || !variantId) {
      return res.status(400).json({ error: 'Missing productId or variantId' });
    }

    const products = getProductsCatalog();
    const product = products.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const variant = product.variants.find(v => String(v.id) === String(variantId));
    if (!variant) {
      return res.status(404).json({ error: 'Variant not found' });
    }

    const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
    const host = req.headers['host'];
    const origin = `${protocol}://${host}`;

    const displayImage = product.images && product.images.length > 0
      ? (product.images[0].src || product.images[0])
      : '';

    const unitAmount = Number(variant.price);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'IE', 'AU', 'NZ', 'DE', 'FR'],
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${product.title} - ${variant.title || 'Standard'}`,
              description: product.description ? product.description.substring(0, 250) : 'Official Wren Montgomery Merchandise',
              images: displayImage ? [displayImage] : [],
            },
            unit_amount: unitAmount,
          },
          quantity: Number(quantity) || 1,
        },
      ],
      mode: 'payment',
      metadata: {
        productId: product.id,
        variantId: String(variant.id),
        productTitle: product.title,
        variantTitle: variant.title || 'Standard',
        quantity: String(quantity || 1),
      },
      success_url: `${origin}/merch/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#merch`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ error: error.message || 'Failed to create checkout session' });
  }
});

// --------------------------------------------------------------------------
// API: Newsletter / Fan Club Signup
// --------------------------------------------------------------------------
app.post('/api/newsletter', (req, res) => {
  const { email, name } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }
  // Log and return confirmation
  console.log(`[Tailgate Club Fan Signup] Email: ${email}, Name: ${name || 'Fan'}`);
  res.json({ success: true, message: "Welcome to The Tailgate Club! You're on the VIP list." });
});

// Explicit route for /merch/success
app.get('/merch/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'merch', 'success', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Static assets
app.use(express.static(path.join(__dirname)));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Wren Montgomery official server running on http://localhost:${PORT}`);
});
