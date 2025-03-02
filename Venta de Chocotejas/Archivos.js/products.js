
const allHoverImages = document.querySelectorAll('.extra-images-container div img')
const imgContainer = document.querySelector('.img-container');

window.addEventListener('DOMContentLoaded', () => {
    allHoverImages[0].parentElement.classList.add('active');
});

allHoverImages.forEach((image) => {
    image.addEventListener('mouseover', () =>{
        imgContainer.querySelector('img').src = image.src;
        resetActiveImg();
        image.parentElement.classList.add('active');
    });
});

function resetActiveImg(){
    allHoverImages.forEach((img) => {
        img.parentElement.classList.remove('active');
    });
}

function selectProduct(productId) {
    window.location.href = window.location.pathname + "?product=" + productId;
}

const products = {
    1: {
        name: "Chocoteja de Fresa",
        price: "s/15",
        img: "images/f.webp",
        description: "Fresa Fresca cubierta de chocolate.",
        extraImages: ["images/f.webp", "images/f.webp", "images/f.webp"]
    },
    2: {
        name: "Chocoteja de Manjar Blanco",
        price: "s/15",
        img: "images/m.webp",
        description: "Dulce manjar de las amazonas.",
        extraImages: ["images/m.webp", "images/m.webp", "images/m.webp", "images/f.webp"]
    },
    3: {
        name: "Chocoteja de Oreo",
        price: "s/15",
        img: "images/n.webp",
        description: "Oreate un poco con esta delicia.",
        extraImages: ["images/n1.webp", "images/n2.webp", "images/n3.webp"]
    },
    4: {
        name: "Chocoteja de Chin Chin",
        price: "s/700",
        img: "images/g.webp",
        description: "Chin Chin o Lentejas, tú eliges.",
        extraImages: ["images/g1.webp", "images/g2.webp", "images/g3.webp"]
    },
    5: {
        name: "Chocoteja de Lúcuma",
        price: "s/200",
        img: "images/l.webp",
        description: "Sabor intenso de lúcuma.",
        extraImages: ["images/l1.webp", "images/l2.webp", "images/l3.webp"]
    },
    6: {
        name: "Blister de Chocolate",
        price: "s/70",
        img: "images/h.webp",
        description: "Para chuparse los dedos.",
        extraImages: ["images/h1.webp", "images/h2.webp", "images/h3.webp"]
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("product");

    if (productId && products[productId]) {
        const product = products[productId];

        // 🟢 Actualizar la información principal del producto
        document.querySelector(".product-name").textContent = product.name;
        document.querySelector(".product-price").textContent = product.price;
        document.querySelector(".img-container img").src = product.img;
        document.querySelector(".product-description").textContent = product.description;

        // 🟢 Actualizar las imágenes referenciales
        const extraImagesContainer = document.querySelector(".extra-images-container");
        extraImagesContainer.innerHTML = ""; // Limpiar imágenes previas

        product.extraImages.forEach(imageSrc => {
            const div = document.createElement("div"); // Se mantiene la estructura
            const img = document.createElement("img");
            img.src = imageSrc;
            img.alt = "Imagen referencial";
            img.classList.add("extra-image");

            div.appendChild(img); // Se coloca la imagen dentro del div
            extraImagesContainer.appendChild(div); // Se agrega al contenedor principal
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("whatsappModal");
    const closeModalBtn = document.querySelector(".close");
    const buyNowBtn = document.querySelector(".buy-now-btn");
    const confirmOrderBtn = document.getElementById("confirmOrder");

    // Asegurar que el modal esté cerrado al cargar la página
    modal.style.display = "none";

    // Función para abrir el modal
    buyNowBtn.addEventListener("click", function() {
        document.getElementById("modal-product-name").innerText = document.querySelector(".product-name").innerText;
        document.getElementById("modal-product-price").innerText = document.querySelector(".product-price").innerText;
        modal.style.display = "flex";
    });

    // Función para cerrar el modal
    closeModalBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Enviar pedido por WhatsApp
    confirmOrderBtn.addEventListener("click", function() {
        let productName = document.getElementById("modal-product-name").innerText;
        let productPrice = document.getElementById("modal-product-price").innerText;
        let quantity = document.getElementById("quantity").value;
        let message = document.getElementById("message").value;
        let phoneNumber = "999744778";
        
        let fullMessage = `PEDIDO:\nProducto: **${productName}**\n **Precio por unidad: ${productPrice}**\nCantidad: ${quantity}`;
        if (message.trim() !== "") {
            fullMessage += `\n${message}`;
        }
        
        let whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;
        window.open(whatsappURL, "_blank");
        modal.style.display = "none";
    });

    // Cerrar modal si el usuario hace clic fuera de él
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});