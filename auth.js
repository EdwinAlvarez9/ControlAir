document.addEventListener('DOMContentLoaded', function() {
    // Manejar el formulario de login
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Validar campos
        if (!email || !password) {
            alert('Por favor complete todos los campos');
            return;
        }
        
        // Llamar a la función de login
        loginUser(email, password);
    });
    
    // Manejar el formulario de registro
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        // Validar campos
        if (!name || !email || !password || !confirmPassword) {
            alert('Por favor complete todos los campos');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        // Llamar a la función de registro
        registerUser(name, email, password);
    });
});

// Función para login de usuario
function loginUser(email, password) {
    // Aquí iría la conexión con el backend PHP que consulta SQL Server
    fetch('php/auth.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: 'login',
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Login exitoso
            alert('Bienvenido ' + data.user.name);
            // Cerrar modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            modal.hide();
            // Aquí podrías redirigir o mostrar contenido exclusivo
        } else {
            alert(data.message || 'Error en el login');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    });
}

// Función para registrar usuario
function registerUser(name, email, password) {
    // Aquí iría la conexión con el backend PHP que inserta en SQL Server
    fetch('php/auth.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: 'register',
            name: name,
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registro exitoso. Ahora puede iniciar sesión.');
            // Cambiar a pestaña de login
            const loginTab = new bootstrap.Tab(document.getElementById('login-tab'));
            loginTab.show();
        } else {
            alert(data.message || 'Error en el registro');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    });
}