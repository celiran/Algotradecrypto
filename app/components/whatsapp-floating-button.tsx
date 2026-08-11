const whatsappUrl = "https://wa.me/972528249299?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20AlgoTradeCrypto%20%D7%95%D7%90%D7%A0%D7%99%20%D7%A8%D7%95%D7%A6%D7%94%20%D7%9C%D7%A9%D7%90%D7%95%D7%9C%20%D7%A9%D7%90%D7%9C%D7%94.";

export default function WhatsappFloatingButton() {
  return <a className="whatsapp-floating-button" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="שליחת שאלה ב־WhatsApp">
    <span>שאלו אותי כל שאלה</span>
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none"><path d="M25.7 6.3A13.5 13.5 0 0 0 5.4 24.2L4 28l4-1.3A13.5 13.5 0 1 0 25.7 6.3Z"/><path d="M11.6 9.8c.4-1 1-1 1.4-1h.8c.2 0 .5.1.6.5l1.1 2.7c.1.4.1.6 0 .8l-.8 1c-.2.2-.3.4-.1.7.4.7 1 1.6 1.9 2.4 1 .9 1.9 1.5 2.7 1.9.3.2.6.1.8-.1l1-1.2c.3-.3.5-.3.8-.2l2.5 1.2c.4.2.5.4.5.6v.8c0 .5-.4 1.1-.8 1.5-.6.6-1.5 1-2.5.8-1.1-.2-3.6-1.1-6-3.3-2.5-2.2-3.9-4.8-4.1-5.9-.2-1 .1-2 .7-2.6Z"/></svg>
  </a>;
}
