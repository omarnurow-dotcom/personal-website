// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksForActive = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        const scrollPosition = window.scrollY;
        const navHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinksForActive.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Throttle scroll event for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                highlightNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // Contact Form Submission (demo)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message (demo)
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.skill-category, .project-card, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Code data storage
const projectCodeData = {
    'code1': {
        title: 'E-Commerce Platform',
        tabs: [
            { id: 'frontend1', name: 'Frontend (React)', code: '// React App.js\nimport React, { useState, useEffect } from \'react\';\nimport \'./App.css\';\n\nfunction App() {\n  const [products, setProducts] = useState([]);\n  const [cart, setCart] = useState([]);\n\n  useEffect(() => {\n    fetchProducts();\n  }, []);\n\n  const fetchProducts = async () => {\n    try {\n      const response = await fetch(\'/api/products\');\n      const data = await response.json();\n      setProducts(data);\n    } catch (error) {\n      console.error(\'Error fetching products:\', error);\n    }\n  };\n\n  const addToCart = (product) => {\n    setCart([...cart, product]);\n    alert(product.name + \' added to cart!\');\n  };\n\n  return (\n    <div className="App">\n      <header className="App-header">\n        <h1>E-Commerce Store</h1>\n        <span className="cart-count">Cart: {cart.length} items</span>\n      </header>\n      <main>\n        <section className="products">\n          <h2>Featured Products</h2>\n          <div className="product-grid">\n            {products.map(product => (\n              <div key={product.id} className="product-card">\n                <img src={product.image} alt={product.name} />\n                <h3>{product.name}</h3>\n                <p>${product.price}</p>\n                <button onClick={() => addToCart(product)}>Add to Cart</button>\n              </div>\n            ))}\n          </div>\n        </section>\n      </main>\n    </div>\n  );\n}\n\nexport default App;' },
            { id: 'backend1', name: 'Backend (Node.js)', code: '// Node.js server.js\nconst express = require(\'express\');\nconst mongoose = require(\'mongoose\');\nconst cors = require(\'cors\');\nrequire(\'dotenv\').config();\n\nconst app = express();\nconst PORT = process.env.PORT || 5000;\n\napp.use(cors());\napp.use(express.json());\n\nmongoose.connect(process.env.MONGO_URI, {\n  useNewUrlParser: true,\n  useUnifiedTopology: true\n})\n.then(() => console.log(\'MongoDB connected\'))\n.catch(err => console.error(err));\n\nconst productSchema = new mongoose.Schema({\n  name: String,\n  price: Number,\n  description: String,\n  image: String,\n  category: String\n});\n\nconst Product = mongoose.model(\'Product\', productSchema);\n\napp.get(\'/api/products\', async (req, res) => {\n  try {\n    const products = await Product.find();\n    res.json(products);\n  } catch (error) {\n    res.status(500).json({ error: error.message });\n  }\n});\n\napp.post(\'/api/products\', async (req, res) => {\n  try {\n    const newProduct = new Product(req.body);\n    await newProduct.save();\n    res.status(201).json(newProduct);\n  } catch (error) {\n    res.status(400).json({ error: error.message });\n  }\n});\n\napp.listen(PORT, () => {\n  console.log(\'Server running on port \' + PORT);\n});' }
        ]
    },
    'code2': {
        title: 'Task Management App',
        tabs: [
            { id: 'vue2', name: 'Vue.js', code: '// Vue.js App.vue\n<template>\n  <div id="app">\n    <header>\n      <h1>Task Manager</h1>\n      <button @click="showAddTask = true">+ New Task</button>\n    </header>\n    <main>\n      <div class="columns">\n        <div v-for="column in columns" :key="column.id" class="column">\n          <h3>{{ column.title }}</h3>\n          <div v-for="task in column.tasks" :key="task.id" class="task-card">\n            <h4>{{ task.title }}</h4>\n            <p>{{ task.description }}</p>\n          </div>\n        </div>\n      </div>\n    </main>\n  </div>\n</template>\n\n<script>\nimport { ref } from \'vue\';\n\nexport default {\n  name: \'App\',\n  setup() {\n    const showAddTask = ref(false);\n    const columns = ref([\n      { id: \'todo\', title: \'To Do\', tasks: [] },\n      { id: \'in-progress\', title: \'In Progress\', tasks: [] },\n      { id: \'done\', title: \'Done\', tasks: [] }\n    ]);\n    return { showAddTask, columns };\n  }\n};\n</script>' },
            { id: 'firebase2', name: 'Firebase', code: '// Firebase config\nimport { initializeApp } from \'firebase/app\';\nimport { getFirestore } from \'firebase/firestore\';\nimport { getAuth } from \'firebase/auth\';\n\nconst firebaseConfig = {\n  apiKey: "YOUR_API_KEY",\n  authDomain: "your-project.firebaseapp.com",\n  projectId: "your-project",\n  storageBucket: "your-project.appspot.com",\n  messagingSenderId: "123456789",\n  appId: "1:123456789:web:abcdef"\n};\n\nconst app = initializeApp(firebaseConfig);\nexport const db = getFirestore(app);\nexport const auth = getAuth(app);\n\nexport default app;' }
        ]
    },
    'code3': {
        title: 'Weather Dashboard',
        tabs: [
            { id: 'main3', name: 'Main JS', code: '// Weather Dashboard Application\nclass WeatherDashboard {\n  constructor() {\n    this.apiKey = \'YOUR_API_KEY\';\n    this.baseUrl = \'https://api.openweathermap.org/data/2.5\';\n    this.cache = new Map();\n    this.searchInput = document.getElementById(\'search\');\n    this.cityName = document.getElementById(\'city-name\');\n    this.tempDisplay = document.getElementById(\'temperature\');\n    this.init();\n  }\n  \n  async init() {\n    if (navigator.geolocation) {\n      navigator.geolocation.getCurrentPosition(\n        position => this.getWeatherByCoords(position.coords),\n        () => this.setDefaultCity()\n      );\n    }\n    this.searchInput.addEventListener(\'keypress\', (e) => {\n      if (e.key === \'Enter\') this.searchCity();\n    });\n  }\n  \n  async searchCity() {\n    const city = this.searchInput.value.trim();\n    if (!city) return;\n    try {\n      const data = await this.fetchWeatherData(city);\n      this.updateDisplay(data);\n    } catch (error) {\n      this.showError(\'City not found\');\n    }\n  }\n  \n  async fetchWeatherData(city) {\n    const response = await fetch(\n      this.baseUrl + \'/weather?q=\' + city + \'&units=metric&appid=\' + this.apiKey\n    );\n    if (!response.ok) {\n      throw new Error(\'City not found\');\n    }\n    return response.json();\n  }\n  \n  updateDisplay(data) {\n    this.cityName.textContent = data.name + \', \' + data.sys.country;\n    this.tempDisplay.textContent = Math.round(data.main.temp) + \'C\';\n  }\n  \n  showError(message) {\n    alert(message);\n  }\n}\n\ndocument.addEventListener(\'DOMContentLoaded\', () => {\n  new WeatherDashboard();\n});' },
            { id: 'api3', name: 'API Service', code: '// Weather API Service Module\nconst API_CONFIG = {\n  baseUrl: \'https://api.openweathermap.org/data/2.5\',\n  oneCallUrl: \'https://api.openweathermap.org/data/3.0/onecall\',\n  iconsUrl: \'https://openweathermap.org/img/wn\'\n};\n\nclass WeatherAPI {\n  constructor(apiKey) {\n    this.apiKey = apiKey;\n  }\n  \n  async getCurrentWeather(city) {\n    const response = await fetch(\n      API_CONFIG.baseUrl + \'/weather?q=\' + city + \'&units=metric&appid=\' + this.apiKey\n    );\n    if (!response.ok) {\n      throw new Error(\'HTTP error! status: \' + response.status);\n    }\n    return response.json();\n  }\n  \n  async getForecast(city) {\n    const response = await fetch(\n      API_CONFIG.baseUrl + \'/forecast?q=\' + city + \'&units=metric&appid=\' + this.apiKey\n    );\n    if (!response.ok) {\n      throw new Error(\'HTTP error! status: \' + response.status);\n    }\n    return response.json();\n  }\n  \n  getIconUrl(iconCode) {\n    return API_CONFIG.iconsUrl + \'/\' + iconCode + \'@2x.png\';\n  }\n}\n\nexport default WeatherAPI;' }
        ]
    }
};

let currentCodeTabs = [];
let currentActiveTab = 0;

function showProjectCode(projectId) {
    const modal = document.getElementById('codeModal');
    const modalBody = document.getElementById('codeModalBody');
    const projectData = projectCodeData[projectId];
    
    if (!projectData) return;
    
    currentCodeTabs = projectData.tabs;
    currentActiveTab = 0;
    
    let html = '<h3 class="code-modal-title">' + projectData.title + '</h3>';
    html += '<div class="code-modal-tabs">';
    
    projectData.tabs.forEach((tab, index) => {
        html += '<button class="code-modal-tab ' + (index === 0 ? 'active' : '') + '" onclick="switchCodeTab(' + index + ')">' + tab.name + '</button>';
    });
    
    html += '</div>';
    html += '<div class="code-modal-code">';
    html += '<pre><code id="currentCodeDisplay">' + escapeHtml(projectData.tabs[0].code) + '</code></pre>';
    html += '</div>';
    
    modalBody.innerHTML = html;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function switchCodeTab(tabIndex) {
    currentActiveTab = tabIndex;
    const code = currentCodeTabs[tabIndex].code;
    document.getElementById('currentCodeDisplay').textContent = code;
    
    // Update active tab styling
    const tabs = document.querySelectorAll('.code-modal-tab');
    tabs.forEach((tab, index) => {
        tab.classList.toggle('active', index === tabIndex);
    });
}

function closeCodeModal() {
    document.getElementById('codeModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function escapeHtml(text) {
    return text
        .replace(/</g, '<')
        .replace(/>/g, '>')
        .replace(/&amp;/g, '&');
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    const modal = document.getElementById('codeModal');
    if (e.target === modal) {
        closeCodeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCodeModal();
    }
});

// Utility function to debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

