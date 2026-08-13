const spaceship = 'Surprise Spaceship'

let leben = 120
let diamonds = 100
let repairkits = 1

// Spielkonstanten
const maxLeben = 120
const repairkitPreis = 20
const reparaturStaerke = 40

function renderStatus () {
  document.getElementById('status').innerHTML = `
    <table class="status-tabelle">
      <thead>
        <tr>
          <th colspan="2">${spaceship}</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Leben</td>
          <td>${leben} / ${maxLeben}</td>
        </tr>

        <tr>
          <td>Diamonds</td>
          <td>${diamonds}</td>
        </tr>

        <tr>
          <td>Repairkits</td>
          <td>${repairkits}</td>
        </tr>
      </tbody>
    </table>
  `

  // Zerstörungszustand: roter Hintergrund und "- Zerstört"-Text per CSS
  if (leben <= 0) {
    document.body.classList.add('zerstoert')
  } else {
    document.body.classList.remove('zerstoert')
  }
}

function showError (errorMessage) {
  document.getElementById('error').textContent = errorMessage
}

function clearError () {
  document.getElementById('error').textContent = ''
}

function showMessage (message) {
  document.getElementById('meldung').textContent = message
}

function takeDamage () {
  clearError()

  const damageInput = document.getElementById('damageInput')
  const damage = Number(damageInput.value)

  if (!Number.isInteger(damage) || damage <= 0) {
    showError('Bitte gib eine gültige Schadenshöhe ein.')
    return
  }

  if (leben <= 0) {
    showError('Das Raumschiff ist bereits zerstört.')
    return
  }

  leben = leben - damage

  if (leben < 0) {
    leben = 0
  }

  if (leben === 0) {
    showMessage(`Das Raumschiff wurde durch ${damage} Schaden zerstört!`)
  } else {
    showMessage(`Das Raumschiff hat ${damage} Schaden erhalten.`)
  }

  renderStatus()
}

function buyRepairkits () {
  clearError()

  const repairkitInput = document.getElementById('repairkitInput')
  const anzahl = Number(repairkitInput.value)

  if (!Number.isInteger(anzahl) || anzahl <= 0) {
    showError('Bitte gib eine gültige Anzahl ein.')
    return
  }

  const gesamtPreis = anzahl * repairkitPreis

  if (diamonds < gesamtPreis) {
    showError(
      `Du benötigst ${gesamtPreis} Diamonds, besitzt aber nur ${diamonds}.`
    )
    return
  }
  diamonds = diamonds - gesamtPreis
  repairkits = repairkits + anzahl

  showMessage(`${anzahl} Repairkit(s) erfolgreich gekauft.`)
  renderStatus()
}

function useRepairkit () {
  clearError()

  if (repairkits <= 0) {
    showError('Du besitzt keine Repairkits mehr.')
    return
  }

  if (leben <= 0) {
    showError('Ein zerstörtes Raumschiff kann nicht repariert werden.')
    return
  }

  if (leben === maxLeben) {
    showError('Das Raumschiff hat bereits volle Lebenspunkte.')
    return
  }

  repairkits = repairkits - 1
  leben = leben + reparaturStaerke

  if (leben > maxLeben) {
    leben = maxLeben
  }

  showMessage(`Ein Repairkit wurde benutzt. Leben: ${leben} / ${maxLeben}`)

  renderStatus()
}

renderStatus()