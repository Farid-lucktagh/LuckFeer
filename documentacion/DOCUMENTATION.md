# Documentación del Proyecto de Sistema de Gestión

## 📋 Descripción General

Este es un sistema integral de gestión de ventas e inventario construido con **Laravel 11**, **React/TypeScript**, e **Inertia.js**. El proyecto proporciona funcionalidades completas para:

- **Gestión de Inventario**: Productos, categorías, proveedores y stock
- **Gestión de Clientes**: Base de datos de clientes con datos de contacto y facturación
- **Gestión de Ventas**: Registro de transacciones con detalles de productos
- **Facturación**: Emisión de facturas con códigos únicos y detalles fiscales
- **Autenticación**: Sistema seguro de usuarios con dos factores (2FA)
- **Auditoría**: Registro de actividades del usuario

---

## 🏗️ Estructura del Proyecto

### Backend (Laravel)

```
app/
├── Models/              # Modelos Eloquent
│   ├── User.php        # Usuario del sistema
│   ├── Product.php     # Productos del inventario
│   ├── Category.php    # Categorías de productos
│   ├── Customer.php    # Clientes/Empresas
│   ├── Sale.php        # Transacciones de venta
│   ├── SaleItem.php    # Items individuales de venta
│   ├── Invoice.php     # Facturas emitidas
│   ├── InvoiceItem.php # Items de facturas
│   ├── Supplier.php    # Proveedores
│   └── Log.php         # Registro de actividades
│
├── Http/
│   ├── Controllers/    # Controladores CRUD
│   │   ├── SaleController.php           # Control de ventas
│   │   ├── InvoiceController.php        # Control de facturas
│   │   ├── ProductController.php        # Control de productos
│   │   ├── CategoryController.php       # Control de categorías
│   │   ├── CustomerController.php       # Control de clientes
│   │   ├── SuppliserController.php      # Control de proveedores
│   │   └── UserController.php           # Control de usuarios
│   │
│   ├── Middleware/     # Middlewares personalizados
│   │   ├── HandleInertiaRequests.php  # Configuración Inertia
│   │   └── HandleAppearance.php       # Tema de interfaz
│   │
│   ├── Requests/       # Form Requests (validación)
│   │   ├── StoresaleRequest.php
│   │   ├── StoreInvoiceRequest.php
│   │   └── ...otros
│   │
│   └── Policies/       # Políticas de autorización
│       ├── UserPolicy.php
│       ├── ProductPolicy.php
│       └── ...otros
│
├── Providers/          # Service Providers
│   ├── AppServiceProvider.php
│   └── FortifyServiceProvider.php
│
└── Concerns/           # Traits y mixins
    ├── PasswordValidationRules.php
    └── ProfileValidationRules.php

database/
├── migrations/         # Migraciones de BD
├── seeders/            # Seeders para datos de prueba
└── factories/          # Factories para tests

routes/
├── web.php             # Rutas principales
├── settings.php        # Rutas de configuración
└── console.php         # Comandos de consola

resources/
├── views/
│   └── app.blade.php   # Template principal
│
├── js/
│   ├── pages/          # Páginas React
│   ├── components/     # Componentes React
│   ├── layouts/        # Layouts
│   ├── hooks/          # Custom hooks
│   ├── types/          # Tipos TypeScript
│   ├── lib/            # Utilidades
│   └── app.tsx         # App root

config/
├── app.php             # Configuración general
├── database.php        # Configuración de BD
├── auth.php            # Configuración de auth
├── fortify.php         # Configuración de Fortify
└── ...otros
```

---

## 🗄️ Modelos y Relaciones

### Modelos Principales

#### **User** (Usuario)
- Autenticación con 2FA
- Rol: admin, cajero, vendedor
- Relaciones: ventas, actividades(logs)

#### **Product** (Producto)
- Stock tracking
- Precios (venta y costo)
- Categoría y proveedor
- Estados: disponible, bajo, sin

#### **Category** (Categoría)
- Clasificación de productos
- Color asociado para UI
- Ayuda a organizar inventario

#### **Customer** (Cliente)
- Datos de contacto y documentación
- Histórico de compras
- Información de facturación

#### **Sale** (Venta)
- Transacción de venta
- Cliente y usuario responsable
- Montos: subtotal, impuesto, total
- Items asociados

#### **Invoice** (Factura)
- Documento fiscal emitido
- Código único (FAC-XXXXXX)
- Detalles de IVA y descuentos
- Items detallados

#### **Supplier** (Proveedor)
- Información comercial
- Datos de contacto
- Relación con productos

---

## 🛠️ Controladores

### SaleController
**Métodos:**
- `index()` - Listar ventas
- `create()` - Formulario crear venta
- `store()` - Guardar venta (con transacción BD)
- `show()` - Ver detalles
- `edit()` - Formulario editar
- `update()` - Actualizar venta
- `destroy()` - Eliminar venta

**Característica importante:** Decrementación automática de stock al crear/actualizar venta

### InvoiceController
**Métodos:**
- `index()` - Listar facturas
- `create()` - Formulario crear factura
- `store()` - Generar factura (genera código único)
- `destroy()` - Eliminar factura

**Característica importante:** Genera código de factura único (FAC-000001, FAC-000002...), manejo de IVA y descuentos

### ProductController, CategoryController, CustomerController
CRUD estándar con vistas Inertia

---

## 🔐 Middlewares

### HandleInertiaRequests
- Configura props globales para todas las vistas React
- Comparte datos del usuario autenticado
- Gestiona estado del sidebar

### HandleAppearance
- Gestiona tema (claro/oscuro/sistema)
- Lee preferencia de cookies
- Disponible en todas las vistas

---

## 🗂️ Proveedores de Servicios

### AppServiceProvider
- Registra servicios comunes
- Configuraciones globales de aplicación

### FortifyServiceProvider
- Configura autenticación con Fortify
- Define vistas de auth
- Configura actions de registro y reset de contraseña
- Limita intentos de login

---

## 💾 Migraciones Base de Datos

### Tablas Principales
```sql
users                    # Usuarios del sistema
products                 # Productos del inventario
categories               # Categorías de productos
suppliers                # Proveedores
customers                # Clientes
sales                    # Ventas
sale_items               # Items de ventas
invoices                 # Facturas
invoice_items            # Items de facturas
activity_logs            # Logs de actividad
```

---

## 🎨 Frontend (React/TypeScript)

### Estructura de Componentes

```
resources/js/
├── pages/
│   ├── auth/              # Páginas de autenticación
│   ├── dashboard.tsx      # Panel principal
│   ├── sales/             # Gestión de ventas
│   ├── invoices/          # Gestión de facturas
│   ├── products/          # Gestión de productos
│   ├── categories/        # Gestión de categorías
│   ├── customers/         # Gestión de clientes
│   ├── users/             # Gestión de usuarios
│   └── settings/          # Configuración
│
├── components/
│   ├── app-shell.tsx      # Layout principal
│   ├── nav-main.tsx       # Navegación
│   ├── breadcrumbs.tsx    # Migas de pan
│   └── ...ui components
│
├── layouts/
│   ├── app-layout.tsx     # Layout de app
│   └── auth-layout.tsx    # Layout de auth
│
├── hooks/
│   ├── use-mobile.tsx
│   ├── use-appearance.tsx
│   ├── use-two-factor-auth.ts
│   └── ...otros hooks
│
└── types/
    ├── index.ts          # Tipos principales
    ├── auth.ts           # Tipos de auth
    └── ...otros
```

---

## 🔄 Flujo de Datos Importantes

### Crear Venta
1. Usuario accede a `/sales/create`
2. Se cargan clientes activos y productos disponibles
3. Usuario selecciona items y cantidades
4. Al guardar:
   - Se validan datos con `StoresaleRequest`
   - Inicia transacción BD
   - Crea registro de venta
   - Crea items de venta
   - Decrementa stock
   - Actualiza estado del producto
   - Confirma o revierte según errores

### Crear Factura
1. Usuario accede a `/invoices/create`
2. Selecciona cliente (por número de documento)
3. Agrega items de venta
4. Al guardar:
   - Genera código único (FAC-XXXXXX)
   - Calcula IVA según porcentaje
   - Aplica descuentos
   - Crea factura y sus items
   - Actualiza stock

---

## 🔒 Seguridad

### Autenticación
- Laravel Fortify con 2FA
- Hash de contraseñas con bcrypt
- Rate limiting en login
- Verificación de email opcional

### Autorización
- Políticas (Policies) por modelo
- Middleware de autenticación
- Protección CSRF

### Validación
- Form Requests para validación de entrada
- Reglas personalizadas de validación
- Mensajes de error translatable

---

## 🎯 Características Principales

### 1. Gestión de Inventario
- Agregar/editar/eliminar productos
- Seguimiento de stock en tiempo real
- Alertas de stock bajo
- Costo y precio de venta

### 2. Ventas
- Crear ventas con múltiples items
- Crédito automático de stock
- Métodos de pago variados
- Transacciones seguras

### 3. Facturación
- Emisión de facturas automáticas
- Códigos únicos y secuenciales
- Cálculo de IVA y descuentos
- Exportable (implementación futura)

### 4. Usuarios
- Creación y gestión de usuarios
- Roles diferentes (admin, cajero, gerente)
- Autenticación de dos factores
- Perfil y cambio de contraseña

### 5. Reportes
- Logs de actividad de usuarios
- Histórico de transacciones
- Información de cliente

---

## 📝 Notas de Desarrollo

### Convenciones
- Nombres de modelos singulares (User, Product, Sale)
- Controladores con sufijo "Controller"
- Requests con "Store" y "Update" para acciones
- Métodos public para acciones principales
- Comments en secciones de código complejo

### Relaciones Importantes
```php
// Usuario tiene muchas ventas
User::ventas()      // Sale

// Producto pertenece a una categoría
Product::categoria() // Category

// Venta tiene muchos items
Sale::items()       // SaleItem

// Cliente tiene muchas ventas
Customer::ventas()  // Sale
```

### Stock Tracking
- Decremento en `SaleController@store()` y `InvoiceController@store()`
- Estados: 'disponible', 'bajo', 'sin'
- `stock_minimo` define umbral de alerta

---

## 🚀 Próximas Mejoras

- [ ] Exportación de reportes (PDF, Excel)
- [ ] Dashboard con gráficas
- [ ] Notificaciones en tiempo real
- [ ] Integración de pagos
- [ ] API RESTful
- [ ] Tests automatizados
- [ ] Backup automático

---

## 📞 Soporte

Para preguntas sobre la estructura o funcionamiento, consultar los comentarios específicos en el código de cada archivo.
