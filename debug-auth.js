// Script de debug para verificar el flujo de autenticación
// Ejecutar en la consola del navegador después de hacer login

console.clear();
console.log('🔍 DEBUG: Verificando autenticación...\n');

// 1. Verificar localStorage
const token = localStorage.getItem('auth_token');
console.log('1️⃣ Token en localStorage:', token ? '✅ Existe' : '❌ No existe');
if (token) {
  console.log('   Token:', token.substring(0, 20) + '...');
}

// 2. Verificar que el token es válido (decodificar sin verificar)
if (token) {
  try {
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1]));
      console.log('2️⃣ Payload del token:', payload);
      
      const exp = new Date(payload.exp * 1000);
      const now = new Date();
      console.log('   Expira:', exp.toLocaleString());
      console.log('   Expirado:', exp < now ? '❌ SÍ' : '✅ NO');
    }
  } catch (e) {
    console.log('2️⃣ Error decodificando token:', e);
  }
}

// 3. Hacer una petición de prueba
if (token) {
  console.log('\n3️⃣ Probando petición al backend...');
  
  fetch('http://localhost:3000/deno/auth/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    console.log('   Status:', response.status, response.statusText);
    return response.json();
  })
  .then(data => {
    console.log('   Respuesta:', data);
    console.log('   ✅ Usuario autenticado correctamente');
  })
  .catch(error => {
    console.log('   ❌ Error:', error);
  });
} else {
  console.log('\n❌ No hay token para probar');
}

console.log('\n📝 Instrucciones:');
console.log('   1. Si no hay token: Haz login primero');
console.log('   2. Si el token está expirado: Vuelve a hacer login');
console.log('   3. Si hay error 401: Verifica que el backend esté corriendo');
console.log('   4. Si todo está bien: El problema puede estar en CORS o en el JWT_SECRET');
