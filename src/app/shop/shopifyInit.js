const SHOPIFY_SCRIPT_URL =
  "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

const SHOPIFY_OPTIONS = {
  product: {
    styles: {
      product: {
        "@media (min-width: 601px)": {
          "max-width": "calc(33.33333% - 30px)",
          "margin-left": "30px",
          "margin-bottom": "50px",
          width: "calc(33.33333% - 30px)",
        },
        img: {
          height: "calc(100% - 15px)",
          position: "absolute",
          left: "0",
          right: "0",
          top: "0",
        },
        imgWrapper: {
          "padding-top": "calc(75% + 15px)",
          position: "relative",
          height: "0",
        },
      },
      title: { color: "#1e2d5a" },
      button: {
        "font-size": "16px",
        "padding-top": "16px",
        "padding-bottom": "16px",
        ":hover": { "background-color": "#334d99" },
        "background-color": "#1e2d5a",
        ":focus": { "background-color": "#334d99" },
      },
      quantityInput: {
        "font-size": "16px",
        "padding-top": "16px",
        "padding-bottom": "16px",
      },
      price: { "font-size": "20px", color: "#1e2d5a" },
      compareAt: { "font-size": "17px", color: "#1e2d5a" },
      unitPrice: { "font-size": "17px", color: "#1e2d5a" },
    },
    text: { button: "Add to cart" },
  },
  productSet: {
    styles: {
      products: {
        "@media (min-width: 601px)": { "margin-left": "-30px" },
      },
    },
  },
  modalProduct: {
    contents: {
      img: false,
      imgWithCarousel: true,
      button: false,
      buttonWithQuantity: true,
    },
    styles: {
      product: {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0px",
          "margin-bottom": "0px",
        },
      },
      button: {
        "font-size": "16px",
        "padding-top": "16px",
        "padding-bottom": "16px",
        ":hover": { "background-color": "#334d99" },
        "background-color": "#1e2d5a",
        ":focus": { "background-color": "#334d99" },
      },
      quantityInput: {
        "font-size": "16px",
        "padding-top": "16px",
        "padding-bottom": "16px",
      },
      title: {
        "font-family": "Helvetica Neue, sans-serif",
        "font-weight": "bold",
        "font-size": "26px",
        color: "#4c4c4c",
      },
      price: {
        "font-family": "Helvetica Neue, sans-serif",
        "font-weight": "normal",
        "font-size": "18px",
        color: "#4c4c4c",
      },
      compareAt: {
        "font-family": "Helvetica Neue, sans-serif",
        "font-weight": "normal",
        "font-size": "15.3px",
        color: "#4c4c4c",
      },
      unitPrice: {
        "font-family": "Helvetica Neue, sans-serif",
        "font-weight": "normal",
        "font-size": "15.3px",
        color: "#4c4c4c",
      },
    },
    text: { button: "Add to cart" },
  },
  option: {},
  cart: {
    styles: {
      button: {
        "font-size": "16px",
        "padding-top": "16px",
        "padding-bottom": "16px",
        ":hover": { "background-color": "#334d99" },
        "background-color": "#1e2d5a",
        ":focus": { "background-color": "#334d99" },
      },
      title: { color: "#1e2d5a" },
      header: { color: "#1e2d5a" },
      lineItems: { color: "#1e2d5a" },
      subtotalText: { color: "#1e2d5a" },
      subtotal: { color: "#1e2d5a" },
      notice: { color: "#1e2d5a" },
      currency: { color: "#1e2d5a" },
      close: { color: "#1e2d5a", ":hover": { color: "#1e2d5a" } },
      empty: { color: "#1e2d5a" },
      noteDescription: { color: "#1e2d5a" },
      discountText: { color: "#1e2d5a" },
      discountIcon: { fill: "#1e2d5a" },
      discountAmount: { color: "#1e2d5a" },
      cart: { "background-color": "#f0ebe0" },
      footer: { "background-color": "#f0ebe0" },
    },
    text: { total: "Subtotal", button: "Checkout" },
    popup: false,
  },
  toggle: {
    styles: {
      toggle: {
        "background-color": "#1e2d5a",
        ":hover": { "background-color": "#334d99" },
        ":focus": { "background-color": "#334d99" },
      },
      count: { "font-size": "16px" },
    },
  },
  lineItem: {
    styles: {
      variantTitle: { color: "#1e2d5a" },
      title: { color: "#1e2d5a" },
      price: { color: "#1e2d5a" },
      fullPrice: { color: "#1e2d5a" },
      discount: { color: "#1e2d5a" },
      discountIcon: { fill: "#1e2d5a" },
      quantity: { color: "#1e2d5a" },
      quantityIncrement: { color: "#1e2d5a", "border-color": "#1e2d5a" },
      quantityDecrement: { color: "#1e2d5a", "border-color": "#1e2d5a" },
      quantityInput: { color: "#1e2d5a", "border-color": "#1e2d5a" },
    },
  },
};

export function initShopifyCollection(nodeId, collectionId) {
  function ShopifyBuyInit() {
    var client = window.ShopifyBuy.buildClient({
      domain: "n5kpfa-tu.myshopify.com",
      storefrontAccessToken: "50ac27e18ca1f106ab3e772e39209f09",
    });
    window.ShopifyBuy.UI.onReady(client).then(function (ui) {
      ui.createComponent("collection", {
        id: collectionId,
        node: document.getElementById(nodeId),
        moneyFormat: "%24%7B%7Bamount%7D%7D",
        options: SHOPIFY_OPTIONS,
      });
    });
  }

  function loadScript() {
    var script = document.createElement("script");
    script.async = true;
    script.src = SHOPIFY_SCRIPT_URL;
    (
      document.getElementsByTagName("head")[0] ||
      document.getElementsByTagName("body")[0]
    ).appendChild(script);
    script.onload = ShopifyBuyInit;
  }

  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }
}
