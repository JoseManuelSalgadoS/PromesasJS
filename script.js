//Ejercicio 1
function promesasEncadenadas() {
    const promesa1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            const numero = Math.floor(Math.random() * 100) + 1;
            resolve(numero);
        }, 2000);
    });

    const promesa2 = promesa1.then(numero => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(numero * numero);
            }, 3000);
        });
    });

    const promesa3 = promesa2.then(numero => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Math.sqrt(numero));
            }, 1000);
        });
    });
    return promesa3;
}

promesasEncadenadas()
  .then((resultado) => {
    console.log("Resultado final:", resultado);
  })
  .catch((error) => {
    console.error("Error:", error);
  });


//Ejercicio 2
function promesasMúltiplesSolicitudes(urls) {
    const promesa = new Promise((resolve, reject) => {
        const promesas = urls.map(url => {
            return fetch(url).then(res => {
                return res.json();
            }, err => {
                reject(err);
            });
        });

        Promise.all(promesas).then(resultados => {
            resolve(resultados);
        }, err => {
            reject(err);
        });
    });

    return promesa;
}

const urls = ["https://rickandmortyapi.com/api/character", "https://reqres.in/api/users/2", "https://swapi.dev/api/people/2/"];
promesasMúltiplesSolicitudes(urls)
  .then((resultados) => {
    console.log("Resultados de las solicitudes:", resultados);
  })
  .catch((error) => {
    console.error("Error:", error);
  });


//Ejercicio 3
function promesasParalelas(funciones) {
    return new Promise((resolve, reject) => {
        const promesas = funciones.map(funcion => funcion());

        Promise.all(promesas)
            .then(resultados => {
                resolve(resultados);
            })
            .catch(err => {
                reject(err);
            });
    });
}

const promesa1 = () => new Promise((resolve) => setTimeout(() => resolve(1), 1000));
const promesa2 = () => new Promise((resolve) => setTimeout(() => resolve(2), 2000));
const promesa3 = () => new Promise((resolve) => setTimeout(() => resolve(3), 1500));

promesasParalelas([promesa1, promesa2, promesa3])
  .then((resultados) => {
    console.log("Resultados de las promesas paralelas:", resultados);
  })
  .catch((error) => {
    console.error("Error:", error);
  });



//Ejercicio 4
function promesasEnCadenaConRetraso(n) {
    const promesaFinal = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Todas las promesas se resolvieron");
        }, n * 1000);
    });

    const promesas = [];
    for (let i = 0; i < n; i++) {
        const promesa = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(i);
                resolve(i);
            }, n * 1000);
        });
        promesas.push(promesa);
    }

    const promesaEncadenada = Promise.all(promesas).then(() => {
        promesaFinal.resolve();
    });

    return promesaFinal;
}

promesasEnCadenaConRetraso(5)
  .then(() => {
    console.log("Todas las promesas se resolvieron");
  })
  .catch((error) => {
    console.error("Error:", error);
  });



//Ejercicio 5
function promesaConCancelacion() {
    let cancelado = false;

    const promesa = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (cancelado) {
                reject("Promesa cancelada");
            } else {
                resolve("La promesa se resolvió");
            }
        }, 5000);
    });

    const cancelar = () => {
        cancelado = true;
    };

    return {
        promesa,
        cancelar,
    };
}

const { promesa, cancelar } = promesaConCancelacion();
cancelar();

promesa
  .then((resultado) => {
    console.log("Resultado:", resultado);
  })
  .catch((error) => {
    console.error("Error:", error);
  });



