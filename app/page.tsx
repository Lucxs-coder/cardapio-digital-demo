"use client";

import { useMemo, useState } from "react";

type Product = { id: number; name: string; description: string; price: number; emoji: string; category: string };

const products: Product[] = [
  { id: 1, name: "Bruschetta italiana", description: "Pão artesanal, tomate confitado e manjericão.", price: 24.9, emoji: "🍅", category: "Entradas" },
  { id: 2, name: "Bowl mediterrâneo", description: "Grãos, legumes frescos e molho de ervas.", price: 32.9, emoji: "🥗", category: "Entradas" },
  { id: 3, name: "Risoto de cogumelos", description: "Arroz arbóreo cremoso e parmesão.", price: 48.9, emoji: "🍚", category: "Principais" },
  { id: 4, name: "Filé ao molho de vinho", description: "Acompanha batatas rústicas e legumes.", price: 59.9, emoji: "🥩", category: "Principais" },
  { id: 5, name: "Massa ao pesto", description: "Massa fresca, pesto de manjericão e castanhas.", price: 42.9, emoji: "🍝", category: "Principais" },
  { id: 6, name: "Cheesecake de frutas", description: "Creme suave com calda de frutas vermelhas.", price: 21.9, emoji: "🍰", category: "Sobremesas" },
  { id: 7, name: "Soda cítrica", description: "Limão, hortelã e água com gás.", price: 13.9, emoji: "🍋", category: "Bebidas" },
  { id: 8, name: "Café especial", description: "Grãos selecionados, coado na hora.", price: 9.9, emoji: "☕", category: "Bebidas" },
];

const money = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [showCart, setShowCart] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const categories = ["Todos", "Entradas", "Principais", "Sobremesas", "Bebidas"];
  const visible = activeCategory === "Todos" ? products : products.filter((product) => product.category === activeCategory);
  const cartItems = useMemo(() => products.filter((product) => cart[product.id]), [cart]);
  const quantity = Object.values(cart).reduce((sum, item) => sum + item, 0);
  const total = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0);
  const add = (id: number) => setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  const remove = (id: number) => setCart((current) => { const next = { ...current }; if (next[id] <= 1) delete next[id]; else next[id] -= 1; return next; });

  return <main className="app-shell"><section className="phone-frame">
    <header className="hero"><div className="brand-row"><div className="brand-mark">S</div><span>Sabor &amp; Mesa</span><small>DEMO</small></div><p className="eyebrow">CARDÁPIO DIGITAL</p><h1>Sabor que chega até você.</h1><p className="hero-copy">Uma demonstração de experiência para pedidos digitais em restaurantes, hotéis e eventos.</p><div className="service-chip"><span>●</span> Atendimento disponível agora <b>• 25–35 min</b></div></header>
    <section className="content"><div className="welcome"><div><p>Olá, visitante</p><h2>O que vamos preparar hoje?</h2></div><div className="avatar">🍽️</div></div><div className="category-bar">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={activeCategory === category ? "category active" : "category"}>{category}</button>)}</div><div className="section-heading"><div><p>ESCOLHAS DO DIA</p><h2>Nosso cardápio</h2></div><span>{visible.length} itens</span></div><div className="product-list">{visible.map((product) => <article className="product" key={product.id}><div className="food-icon">{product.emoji}</div><div className="product-info"><h3>{product.name}</h3><p>{product.description}</p><strong>{money(product.price)}</strong></div><div className="stepper">{cart[product.id] ? <><button aria-label={`Remover ${product.name}`} onClick={() => remove(product.id)}>−</button><span>{cart[product.id]}</span></> : null}<button aria-label={`Adicionar ${product.name}`} onClick={() => add(product.id)}>+</button></div></article>)}</div></section>
    {quantity > 0 && <button className="cart-button" onClick={() => { setShowCart(true); setConfirmed(false); }}><span className="cart-count">{quantity}</span><span>Ver pedido</span><strong>{money(total)} →</strong></button>}
    {showCart && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Resumo do pedido"><section className="cart-modal"><button className="close" aria-label="Fechar" onClick={() => setShowCart(false)}>×</button>{confirmed ? <div className="confirmation"><div>✓</div><h2>Pedido simulado!</h2><p>Esta é uma demonstração. Nenhum pedido foi enviado e nenhum dado foi compartilhado.</p><button onClick={() => setShowCart(false)}>Continuar navegando</button></div> : <><p className="eyebrow">RESUMO DO PEDIDO</p><h2>Seu pedido</h2>{cartItems.map((product) => <div className="cart-line" key={product.id}><span>{cart[product.id]}× {product.name}</span><b>{money(product.price * cart[product.id])}</b></div>)}<div className="cart-total"><span>Total</span><strong>{money(total)}</strong></div><button className="finish" onClick={() => setConfirmed(true)}>Confirmar pedido de demonstração</button></>}</section></div>}
  </section></main>;
}

