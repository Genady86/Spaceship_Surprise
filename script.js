// 1. Startwerte und feste Spielregeln
const spaceship = 'Surprise Spaceship'

const maxLeben = 120
const startDiamonds = 100
const repairkitPreis = 20
const schildPreis = 50
const reparaturStaerke = 40

let leben = maxLeben
let diamonds = startDiamonds

// Repairkits und Schilde werden im Array verwaltet.
let inventar = ['Repairkit']

// 2. Hilfsfunktionen
function countItem (itemName) {
  return inventar.filter(item => item === itemName).length
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

// 3. Status und Inventar im HTML anzeigen
function renderStatus () {
  const repairkitAnzahl = countItem('Repairkit')
  const hatSchild = inventar.includes('Schild')
  const inventarText = inventar.length > 0
    ? inventar.join(', ')
    : 'Leer'

  document.getElementById('status').innerHTML = `
    <table class="status-tabelle">
      <thead>
        <tr>
          <th colspan="2">${spaceship}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Leben</th>
          <td>${leben} / ${maxLeben}</td>
        </tr>
        <tr>
          <th scope="row">Diamonds</th>
          <td>${diamonds}</td>
        </tr>
        <tr>
          <th scope="row">Repairkits</th>
          <td>${repairkitAnzahl}</td>
        </tr>
        <tr>
          <th scope="row">Schild</th>
          <td>${hatSchild ? 'Aktiv - 50 % Schutz' : 'Nicht vorhanden'}</td>
        </tr>
      </tbody>
    </table>

    <div class="inventar-anzeige">
      <h2>Inventar</h2>
      <p>${inventarText}</p>
    </div>
  `

  if (leben <= 0) {
    document.body.classList.add('zerstoert')
  } else {
    document.body.classList.remove('zerstoert')
  }
}

// 4. Schaden nehmen und Schild berücksichtigen
function takeDamage () {
  clearError()

  const damageInput = document.getElementById('damageInput')
  const damage = Number(damageInput.value)

  if (!Number.isInteger(damage) || damage <= 0) {
    showError('Bitte gib eine positive ganze Schadenshöhe ein.')
    return
  }

  if (leben <= 0) {
    showError('Das Raumschiff ist bereits zerstört.')
    return
  }

  let wirklicherSchaden = damage
  const hatSchild = inventar.includes('Schild')

  if (hatSchild) {
    wirklicherSchaden = damage * 0.5
  }

  leben = leben - wirklicherSchaden

  if (leben < 0) {
    leben = 0
  }

  console.log('Eingegebener Schaden:', damage)
  console.log('Schild vorhanden:', hatSchild)
  console.log('Tatsächlicher Schaden:', wirklicherSchaden)
  console.log('Verbleibendes Leben:', leben)

  if (leben === 0) {
    showMessage(
      `Das Raumschiff wurde durch ${wirklicherSchaden} Schaden zerstört!`
    )
  } else if (hatSchild) {
    showMessage(
      `Der Schild hat den Schaden von ${damage} auf ${wirklicherSchaden} halbiert.`
    )
  } else {
    showMessage(`Das Raumschiff hat ${wirklicherSchaden} Schaden erhalten.`)
  }

  renderStatus()
}

// 5. Repairkits kaufen und mit .push() ins Inventar legen
function buyRepairkits () {
  clearError()

  const repairkitInput = document.getElementById('repairkitInput')
  const anzahl = Number(repairkitInput.value)

  if (!Number.isInteger(anzahl) || anzahl <= 0) {
    showError('Bitte gib eine positive ganze Anzahl ein.')
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

  for (let i = 0; i < anzahl; i++) {
    inventar.push('Repairkit')
  }

  console.log('Inventar nach dem Kauf:', inventar)

  showMessage(
    `${anzahl} Repairkit(s) für ${gesamtPreis} Diamonds gekauft.`
  )
  renderStatus()
}

// 6. Repairkit mit .indexOf() finden und .splice() entfernen
function useRepairkit () {
  clearError()

  const repairkitIndex = inventar.indexOf('Repairkit')

  if (repairkitIndex === -1) {
    showError('Du besitzt kein Repairkit.')
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

  inventar.splice(repairkitIndex, 1)
  leben = leben + reparaturStaerke

  if (leben > maxLeben) {
    leben = maxLeben
  }

  console.log('Entfernter Repairkit-Index:', repairkitIndex)
  console.log('Inventar nach der Reparatur:', inventar)

  showMessage(
    `Ein Repairkit wurde benutzt. Leben: ${leben} / ${maxLeben}.`
  )
  renderStatus()
}

// 7. Schild kaufen und mit .push() ins Inventar legen
function buyShield () {
  clearError()

  if (inventar.includes('Schild')) {
    showError('Du besitzt bereits einen Schild.')
    return
  }

  if (diamonds < schildPreis) {
    showError(
      `Du benötigst ${schildPreis} Diamonds, besitzt aber nur ${diamonds}.`
    )
    return
  }

  diamonds = diamonds - schildPreis
  inventar.push('Schild')

  console.log('Inventar nach dem Schildkauf:', inventar)

  showMessage(
    `Schild für ${schildPreis} Diamonds gekauft. Schaden wird jetzt halbiert.`
  )
  renderStatus()
}


// 8. Spiel auf die Startwerte zurücksetzen

function resetGame () {
  leben = maxLeben
  diamonds = startDiamonds
  inventar = ['Repairkit']

  clearError()
  showMessage('Das Spiel wurde auf die Startwerte zurückgesetzt.')
  renderStatus()
}

// Startanzeige beim Laden der Seite
renderStatus()