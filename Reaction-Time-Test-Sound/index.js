values = []
counter = 0

function changeColor(color) {
    console.log('here')
    document.getElementById("rectangle").className = "rectangle "+ color;
}

function playAudio() {
    let audio = new Audio('Beep_Short.mp3')
    audio.play()
}

function main() {
    console.log("I AM IN MAIN METHOD")
    time = calculate_time()
    start()
    setTimeout(function() { playAudio() }, time) ;
}

function calculate_time() {
    let min = 2000
    let max = 5000
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function start() {
    startTime = new Date();
}

function end() {
    endTime = new Date();
    let timeDiff = endTime - startTime;
    let seconds = Math.round(timeDiff);
    let time_reaction = (seconds-time)
    values.push(time_reaction)
    counter++
    document.getElementById('reaction-text-time').textContent= "Tu tiempo de reacción es de : " + time_reaction + 
    " mili-segundos. " +  "( " + counter + "/10 )"
    changeColor('blue')
    if (counter === 10) {
        document.getElementById('start').disabled = true;
        document.getElementById('csv').disabled = false;
    }
}

function generateCSV() {
    const filas = [["Tiempo de Reaccion"], [values.join(',')]]
    let csvContent = "data:text/csv;charset=utf-8," +
    filas.map(e => e.join(",")).join("\n")
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "time_reactions.csv")
    document.body.appendChild(link);
    link.click()
}

document.addEventListener('keyup', processRegistry => {
    if (event.code === 'Space') {
        end()
      }
})