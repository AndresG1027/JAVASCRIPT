const instruccionCentral = document.querySelector('.instruccion-central');

function mostrarEjercicio(idEjercicio) {
    if (instruccionCentral) {
        instruccionCentral.style.display = 'none';
    }

    const tarjetas = document.querySelectorAll('.ejercicio-card');
    tarjetas.forEach(function(tarjeta) {
        tarjeta.style.display = 'none';
    });

    const tarjetaSeleccionada = document.getElementById(idEjercicio);
    if (tarjetaSeleccionada) {
        tarjetaSeleccionada.style.display = 'block';
    }
}

function mostrarResultado(idElemento, mensaje, claseColor) {
    const elemento = document.getElementById(idElemento);
    elemento.innerHTML = mensaje;

    elemento.classList.remove('texto-normal', 'texto-elevado', 'texto-alerta');
    if (claseColor) {
        elemento.classList.add(claseColor);
    }
}

// --- SALUD ---

function calcularPresion() {
    const sistolica = parseInt(document.getElementById('sistolica').value);
    const diastolica = parseInt(document.getElementById('diastolica').value);
    let mensaje = '';
    let clase = '';

    if (sistolica < 120 && diastolica < 80) {
        mensaje = 'Clasificación: Normal.';
        clase = 'texto-normal';
    } else if (sistolica >= 120 && sistolica <= 129 && diastolica < 80) {
        mensaje = 'Clasificación: Elevada.';
        clase = 'texto-elevado';
    } else if ((sistolica >= 130 && sistolica <= 139) || (diastolica >= 80 && diastolica <= 89)) {
        mensaje = 'Clasificación: Hipertensión Grado 1.';
        clase = 'texto-alerta';
    } else if (sistolica >= 140 || diastolica >= 90) {
        mensaje = 'Clasificación: Hipertensión Grado 2.';
        clase = 'texto-alerta';
    } else {
        mensaje = 'Valores no válidos.';
    }

    if (sistolica > diastolica) {
        mensaje += ` (Plus: Presión de pulso: ${sistolica - diastolica})`;
    } else {
        mensaje = 'La presión sistólica debe ser mayor que la diastólica.';
        clase = 'texto-alerta';
    }
    
    mostrarResultado('res-presion', mensaje, clase);
}

function calcularPromedioTemps() {
    const input = document.getElementById('temps-pacientes').value;
    const temps = input.split(',').map(Number).filter(Boolean);
    let suma = 0;
    let min = temps[0];
    let max = temps[0];

    for (let i = 0; i < temps.length; i++) {
        const temp = temps[i];
        suma += temp;
        if (temp < min) min = temp;
        if (temp > max) max = temp;
    }

    const promedio = suma / temps.length;
    const mensaje = `Pacientes registrados: ${temps.length}. <br>
                     Promedio: ${promedio.toFixed(2)}°C. <br>
                     Plus: Temp. Mínima: ${min}°C, Temp. Máxima: ${max}°C.`;
    mostrarResultado('res-temperatura', mensaje, 'texto-normal');
}

function contarFiebre() {
    let contadorFiebre = 0;
    let totalRegistros = 0;
    let temp;

    while (true) {
        const entrada = prompt("Ingresa temperatura (°C). Escribe '0' para terminar.");
        temp = parseFloat(entrada);
        
        if (isNaN(temp)) {
            alert("Por favor, ingresa un número.");
            continue;
        }
        
        if (temp === 0) {
            break;
        }
        
        totalRegistros++;
        if (temp >= 38) {
            contadorFiebre++;
        }
    }
    const mensaje = `Total de registros: ${totalRegistros}. <br>
                     Plus: Pacientes con fiebre (>= 38°C): ${contadorFiebre}.`;
    mostrarResultado('res-fiebre', mensaje, 'texto-elevado');
}

function clasificarTriage() {
    const codigo = parseInt(document.getElementById('codigo-triage').value);
    let mensaje = '';
    let clase = 'texto-normal';

    switch (codigo) {
        case 1:
            mensaje = 'Categoría: Rojo (Atención Inmediata).';
            clase = 'texto-alerta';
            break;
        case 2:
            mensaje = 'Categoría: Amarillo (Atención Urgente).';
            clase = 'texto-elevado';
            break;
        case 3:
            mensaje = 'Categoría: Verde (Atención No Urgente).';
            clase = 'texto-normal';
            break;
        case 4:
            mensaje = 'Categoría: Azul (Atención Diferida).';
            clase = 'texto-normal';
            break;
        default:
            mensaje = 'Plus: Código no válido. Ingrese un valor entre 1 y 4.';
            clase = 'texto-alerta';
    }
    mostrarResultado('res-triage', mensaje, clase);
}

function registrarSaturacion() {
    let mediciones = [];
    let conteoNormal = 0;
    let conteoBajo = 0;
    let entrada;

    do {
        const valor = prompt("Ingresa medición de SpO2 (ej: 98). Escribe 'no' para parar.");
        
        if (valor && valor.toLowerCase() === 'no') {
            entrada = 'no';
        } else {
            const spo2 = parseFloat(valor);
            if (!isNaN(spo2) && spo2 > 0 && spo2 <= 100) {
                mediciones.push(spo2);
                if (spo2 >= 95) {
                    conteoNormal++;
                } else {
                    conteoBajo++;
                }
            } else if (valor !== null) {
                alert("Valor no válido. Ingresa un número (1-100) o 'no'.");
            }
            entrada = valor;
        }
    } while (entrada && entrada.toLowerCase() !== 'no');
    
    const mensaje = `Total mediciones: ${mediciones.length}. <br>
                     Plus: Mediciones normales (>= 95%): ${conteoNormal}. <br>
                     Plus: Mediciones bajas (< 95%): ${conteoBajo}.`;
    mostrarResultado('res-spo2', mensaje, 'texto-normal');
}

// --- MEDIO AMBIENTE ---

function clasificarAQI() {
    const aqi = parseInt(document.getElementById('valor-aqi').value);
    let mensaje = '';
    let clase = '';

    if (aqi >= 0 && aqi <= 50) {
        mensaje = 'Calidad del Aire: Buena.';
        clase = 'texto-normal';
    } else if (aqi >= 51 && aqi <= 100) {
        mensaje = 'Calidad del Aire: Moderada.';
        clase = 'texto-elevado';
    } else if (aqi >= 101 && aqi <= 150) {
        mensaje = 'Calidad del Aire: Dañina a la salud para grupos sensibles.';
        clase = 'texto-alerta';
    } else if (aqi > 150) {
        mensaje = 'Calidad del Aire: Dañina a la salud.';
        clase = 'texto-alerta';
    } else {
        mensaje = 'Valor no válido.';
        clase = 'texto-alerta';
    }

    mensaje += ` (Plus: Valor AQI registrado: ${aqi})`;
    mostrarResultado('res-aqi', mensaje, clase);
}

function calcularPromedioRuido() {
    const input = document.getElementById('mediciones-ruido').value;
    const ruidos = input.split(',').map(Number).filter(Boolean);
    let suma = 0;

    for (let i = 0; i < ruidos.length; i++) {
        suma += ruidos[i];
    }
    const promedio = suma / ruidos.length;
    let mensaje = `Mediciones registradas: ${ruidos.length}. <br>
                   Promedio: ${promedio.toFixed(2)} dB.`;
    
    if (promedio > 85) {
        mensaje += '<br>Plus: ¡Alerta! El promedio supera los 85 dB (riesgo auditivo).';
        mostrarResultado('res-ruido', mensaje, 'texto-alerta');
    } else {
        mensaje += '<br>Plus: El promedio está dentro de límites seguros.';
        mostrarResultado('res-ruido', mensaje, 'texto-normal');
    }
}

function contarFocosCalor() {
    let contadorFocos = 0;
    let maxTemp = 0;
    let totalRegistros = 0;
    let temperatura;

    while (true) {
        const entrada = prompt("Ingresa una temperatura (°C). Escribe '0' para terminar.");
        temperatura = parseFloat(entrada);
        
        if (isNaN(temperatura)) {
            alert("Por favor, ingresa solo números.");
            continue;
        }
        
        if (temperatura === 0) {
            break;
        }

        totalRegistros++;
        if (temperatura > 45) {
            contadorFocos++;
        }
        if (temperatura > maxTemp) {
            maxTemp = temperatura;
        }
    }
    const mensaje = `Total registros válidos: ${totalRegistros}. <br>
                     Focos de calor (> 45°C): ${contadorFocos}. <br>
                     Plus: Temperatura máxima registrada: ${maxTemp}°C.`;
    mostrarResultado('res-incendios', mensaje, 'texto-elevado');
}

function clasificarResiduo() {
    const codigo = parseInt(document.getElementById('codigo-residuo').value);
    let mensaje = '';

    switch (codigo) {
        case 1:
            mensaje = 'Tipo: Orgánico.';
            break;
        case 2:
            mensaje = 'Tipo: Plástico.';
            break;
        case 3:
            mensaje = 'Tipo: Papel/Cartón.';
            break;
        case 4:
            mensaje = 'Tipo: Vidrio.';
            break;
        default:
            mensaje = 'Plus: Código no válido. Ingrese un valor entre 1 y 4.';
    }
    mostrarResultado('res-residuos', mensaje, 'texto-normal');
}

function monitorearRio() {
    let alertas = 0;
    let maxNivel = 0;
    let totalRegistros = 0;
    let entrada;

    do {
        const valor = prompt("Ingresa nivel del río (metros). Escribe 'no' para parar.");
        
        if (valor && valor.toLowerCase() === 'no') {
            entrada = 'no';
        } else {
            const nivel = parseFloat(valor);
            if (!isNaN(nivel) && nivel >= 0) {
                totalRegistros++;
                if (nivel > 3) {
                    alertas++;
                }
                if (nivel > maxNivel) {
                    maxNivel = nivel;
                }
            } else if (valor !== null) {
                alert("Valor no válido. Ingresa un número o 'no'.");
            }
            entrada = valor;
        }
    } while (entrada && entrada.toLowerCase() !== 'no');

    let mensaje = `Total mediciones: ${totalRegistros}. <br>
                   Mediciones sobre 3m: ${alertas}. <br>
                   Plus: Nivel máximo registrado: ${maxNivel}m.`;
    
    if (alertas > 0) {
        mostrarResultado('res-rio', mensaje, 'texto-alerta');
    } else {
        mostrarResultado('res-rio', mensaje, 'texto-normal');
    }
}

// --- ASTRONOMÍA ---

function clasificarBrillo() {
    const magnitud = parseFloat(document.getElementById('magnitud-estelar').value);
    let mensaje = '';
    let clase = 'texto-normal';

    if (magnitud < -1.5) {
        mensaje = 'Clasificación: Extremadamente Brillante.';
    } else if (magnitud >= -1.5 && magnitud < 1.5) {
        mensaje = 'Clasificación: Muy Brillante.';
    } else if (magnitud >= 1.5 && magnitud < 6.5) {
        mensaje = 'Clasificación: Brillante (Visible a simple vista).';
    } else if (magnitud >= 6.5 && magnitud < 10) {
        mensaje = 'Clasificación: Débil (Visible con binoculares).';
    } else if (magnitud >= 10) {
        mensaje = 'Clasificación: No visible (Visible con telescopio).';
    } else {
        mensaje = 'Valor no válido.';
        clase = 'texto-alerta';
    }

    mensaje += ` (Plus: Magnitud ingresada: ${magnitud})`;
    mostrarResultado('res-brillo', mensaje, clase);
}

function calcularPromedioDistancias() {
    const input = document.getElementById('distancias-planetas').value;
    const distancias = input.split(',').map(Number).filter(Boolean);
    let suma = 0;
    let min = distancias[0];
    let max = distancias[0];

    for (let i = 0; i < distancias.length; i++) {
        const dist = distancias[i];
        suma += dist;
        if (dist < min) min = dist;
        if (dist > max) max = dist;
    }

    const promedio = suma / distancias.length;
    const mensaje = `Registros: ${distancias.length}. <br>
                     Promedio: ${promedio.toFixed(2)} millones de km. <br>
                     Plus: Distancia Mínima: ${min} M km, Distancia Máxima: ${max} M km.`;
    mostrarResultado('res-distancias', mensaje, 'texto-normal');
}

function contarCrateres() {
    let contadorGrandes = 0;
    let sumaGrandes = 0;
    let totalRegistros = 0;
    let diametro;

    while (true) {
        const entrada = prompt("Ingresa diámetro de cráter (km). Escribe '0' para terminar.");
        diametro = parseFloat(entrada);
        
        if (isNaN(diametro)) {
            alert("Por favor, ingresa solo números.");
            continue;
        }
        
        if (diametro === 0) {
            break;
        }

        totalRegistros++;
        if (diametro > 50) {
            contadorGrandes++;
            sumaGrandes += diametro;
        }
    }
    
    let promedioGrandes = 0;
    if (contadorGrandes > 0) {
        promedioGrandes = sumaGrandes / contadorGrandes;
    }
    
    const mensaje = `Total cráteres registrados: ${totalRegistros}. <br>
                     Cráteres grandes (> 50km): ${contadorGrandes}. <br>
                     Plus: Diámetro promedio de los grandes: ${promedioGrandes.toFixed(2)} km.`;
    mostrarResultado('res-crateres', mensaje, 'texto-elevado');
}

function identificarCuerpo() {
    const codigo = parseInt(document.getElementById('codigo-cuerpo').value);
    let mensaje = '';

    switch (codigo) {
        case 1:
            mensaje = 'Cuerpo Celeste: Estrella.';
            break;
        case 2:
            mensaje = 'Cuerpo Celeste: Planeta.';
            break;
        case 3:
            mensaje = 'Cuerpo Celeste: Cometa.';
            break;
        case 4:
            mensaje = 'Cuerpo Celeste: Asteroide.';
            break;
        case 5:
            mensaje = 'Cuerpo Celeste: Galaxia.';
            break;
        default:
            mensaje = 'Plus: Código no válido. Ingrese un valor entre 1 y 5.';
    }
    mostrarResultado('res-cuerpo', mensaje, 'texto-normal');
}

function registrarLuz() {
    let alertasNoche = 0;
    let alertasTexto = '';
    let totalRegistros = 0;
    let entrada;

    do {
        const valor = prompt("Ingresa nivel de luz (lux). Escribe 'no' para parar.");
        
        if (valor && valor.toLowerCase() === 'no') {
            entrada = 'no';
        } else {
            const nivel = parseFloat(valor);
            if (!isNaN(nivel) && nivel >= 0) {
                totalRegistros++;
                if (nivel < 5) {
                    alertasNoche++;
                    alertasTexto += `Medición ${totalRegistros}: ${nivel} lux (Noche profunda). <br>`;
                }
            } else if (valor !== null) {
                alert("Valor no válido. Ingresa un número o 'no'.");
            }
            entrada = valor;
        }
    } while (entrada && entrada.toLowerCase() !== 'no');

    const mensaje = `Total mediciones: ${totalRegistros}. <br>
                     Plus: Registros de 'Noche Profunda' (< 5 lux): ${alertasNoche}. <br><br>
                     ${alertasTexto}`;
    mostrarResultado('res-luz', mensaje, 'texto-normal');
}