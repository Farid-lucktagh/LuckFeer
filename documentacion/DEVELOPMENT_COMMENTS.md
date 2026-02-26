# Guía de Desarrollo - Sistema de Gestión

## 📚 Índice de Comentarios Agregados

Este archivo lista todos los cambios de documentación realizados en el proyecto.

### 1. **Modelos (app/Models/)**

Todos los modelos han sido documentados con:
- Comentario de clase describiendo propósito y responsabilidades
- Lista de propiedades principales con PHPDoc
- Nombres descriptivos para cada relación
- Comentarios en scopes y métodos auxiliares

#### Archivos Actualizados:
- `User.php` - Usuario del sistema con rol y estado
- `Product.php` - Productos con categoría, proveedor y stock
- `Customer.php` - Clientes con datos de contacto y facturación
- `Category.php` - Categorías para organizar productos
- `Sale.php` - Transacciones de venta
- `Invoice.php` - Facturas fiscales emitidas
- `Supplier.php` - Proveedores de productos
- `Log.php` - Registro de actividades de usuarios

### 2. **Controladores (app/Http/Controllers/)**

#### Controladores CRUD Principalmente Comentados:

**SaleController.php**
```php
// Métodos comentados:
// - index()    : Lista todas las ventas
// - create()   : Formulario de nueva venta
// - store()    : Guarda venta (incluye transacción BD y stock)
// - show()     : Detalles de venta específica
// - edit()     : Formulario de edición
// - update()   : Actualiza venta
// - destroy()  : Elimina venta
```

**InvoiceController.php**
```php
// Métodos comentados:
// - index()    : Lista facturas
// - create()   : Formulario nueva factura
// - store()    : Genera factura con código único (FAC-XXXXX)
// - destroy()  : Elimina factura
```

**ProductController.php**
- Métodos CRUD con documentación de parámetros y retornos

**CategoryController.php**
- CRUD de categorías con tipos Inertia

**CustomerController.php**
- CRUD de clientes con validación

### 3. **Middlewares (app/Http/Middleware/)**

**HandleInertiaRequests.php**
- Configura datos compartidos entre servidor y cliente
- DocumentadoPropsCompartidos incluyen: nombre app, usuario auth, estado sidebar

**HandleAppearance.php**
- Middleware para tema de la aplicación
- Lee preferencia de cookies
- Inyecta data a todas las vistas

### 4. **Providers (app/Providers/)**

**AppServiceProvider.php**
- Registro de servicios y configuraciones globales
- Método bootstrap() documentado

**FortifyServiceProvider.php**
- Configuración de autenticación con Fortify
- Vistas, acciones y limitadores documentados

### 5. **Rutas (routes/web.php)**

Organizado en secciones lógicas:

```php
// =====================
// RUTAS PÚBLICAS
// =====================
GET /                    // Página de bienvenida

// =====================
// RUTAS PROTEGIDAS
// =====================
GET /dashboard           // Panel principal

// =====================
// CRUD DE PRODUCTOS
// =====================
CRUD: /products          // Gestión de productos

// =====================
// CRUD DE CATEGORÍAS
// =====================
CRUD: /categories        // Gestión de categorías

// =====================
// CRUD DE CLIENTES
// =====================
CRUD: /customers         // Gestión de clientes

// =====================
// CRUD DE USUARIOS
// =====================
CRUD: /users             // Gestión de usuarios

// =====================
// CRUD DE VENTAS
// =====================
CRUD: /sales             // Ventas con stock tracking

// =====================
// CRUD DE FACTURAS
// =====================
CRUD: /invoices          // Facturas con códigos únicos
```

### 6. **Tipos TypeScript (resources/js/types/)**

**index.ts**
- `SharedData` - Props globales disponibles en todas las componentes

**auth.ts**
- `User` - Modelo de usuario
- `Auth` - Datos de autenticación
- `TwoFactorSetupData` - Datos para configurar 2FA
- `TwoFactorSecretKey` - Clave secreta 2FA

### 7. **Hooks (resources/js/hooks/)**

**use-clipboard.ts**
- Hook para copiar texto al portapapeles
- Retorna: [copiedText, copyFunction]

**use-mobile.tsx**
- Hook para detectar dispositivos móviles
- Usa media queries (<768px)

### 8. **Archivos de Documentación Agregados**

**DOCUMENTATION.md** (Este proyecto)
- Descripción general del proyecto
- Estructura completa del directorio
- Modelos y relaciones
- Flujos de datos principales
- Características principales
- Seguridad

---

## 🔍 Patrones de Comentarios Utilizados

### Para Clases
```php
/**
 * Descripción breve
 * 
 * Descripción más detallada explicando responsabilidades.
 * 
 * @property tipo $propiedad Descripción
 */
class MiClase {}
```

### Para Métodos
```php
/**
 * Descripción de qué hace el método.
 * 
 * Pueden incluir detalles de implementación importante.
 * 
 * @param Tipo $parametro Descripción
 * @return Tipo Descripción del retorno
 */
public function miMetodo(Tipo $parametro): Tipo {}
```

### Para Relaciones
```php
/**
 * Descripción breve de la relación.
 * 
 * @return \Illuminate\Database\Eloquent\Relations\RelationType
 */
public function relacion() {}
```

### Para TypeScript
```typescript
/**
 * Hook descriptivo
 * 
 * Detalles de uso.
 * 
 * @returns Tipo de retorno
 * @example
 * const result = useHook();
 */
export function useHook(): Type {}
```

---

## 📍 Localizaciones de Cambios Principales

### Backend (PHP)
✅ Comentados:
- Todos los modelos en `app/Models/`
- Controladores principales en `app/Http/Controllers/`
- Middlewares en `app/Http/Middleware/`
- Providers en `app/Providers/`
- Rutas en `routes/web.php`

⏳ Por comentar:
- Requests en `app/Http/Requests/`
- Policies en `app/Policies/`
- Migrations en `database/migrations/`
- Seeders en `database/seeders/`
- Factories en `database/factories/`

### Frontend (TypeScript/React)
✅ Comentados:
- Tipos en `resources/js/types/`
- Hooks en `resources/js/hooks/`

⏳ Por comentar:
- Páginas en `resources/js/pages/`
- Componentes en `resources/js/components/`
- Layouts en `resources/js/layouts/`

---

## 💡 Notas de Desarrollo

### Convenciones Adoptadas

1. **Nombres significativos**: Todos los nombres de variables, funciones y clases son descriptivos
2. **Comentarios estratégicos**: Se enfatiza en "por qué" más que en "qué"
3. **Tipos documentados**: Propiedades y parámetros tienen tipos específicos
4. **Relaciones explícitas**: Cada relación Eloquent está documentada
5. **Flujos de negocio**: Transacciones y validaciones están explicadas

### Tipos Clave del Proyecto

```typescript
// Usuario autenticado
User { id, name, email, rol, estado }

// Producto
Product { id, nombre, precio, costo, cantidad_stock, stock_minimo, categoria_id, proveedor_id }

// Venta
Sale { id, cliente_id, usuario_id, subtotal, impuesto, total, metodo_pago, estado }

// Factura
Invoice { id, codigo, documento, usuario_id, subtotal, porcentaje_iva, monto_iva, descuento, total }
```

---

## 🚀 Próximos Pasos para Documentación

- [ ] Comentar Requests y validaciones
- [ ] Documentar Policies y autorización
- [ ] Agregar comentarios a factories
- [ ] Documenta migrations
- [ ] Comentar componentes React principales
- [ ] Agregar ejemplos de uso en README
- [ ] Crear guía de API
- [ ] Documentar setup y instalación

---

## 📖 Referencias de Estándares

- **PHP**: [PSR-12](https://www.php-fig.org/psr/psr-12/)
- **Laravel**: [Laravel Conventions](https://laravel.com/docs/11.x/structure)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- **React**: [React Documentation](https://react.dev/)
- **Comments**: [phpDoc](https://docs.phpdoc.org/) y [JSDoc](https://jsdoc.app/)

---

**Última actualización:** 24 de febrero de 2026
