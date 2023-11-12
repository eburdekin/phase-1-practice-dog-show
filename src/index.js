const dogAPI = 'http://localhost:3000/dogs'

function initialFetch() {
    fetch(dogAPI)
    .then(res => res.json())
    .then(dogData => renderAllDogs(dogData))
}

initialFetch()

function renderAllDogs(dogData) {
    const dogTable = document.getElementById('table-body')
    dogTable.innerHTML = ''
    dogData.forEach(dogObj => renderOneDog(dogObj))
}

function renderOneDog(dogObj) {
    const dogTable = document.getElementById('table-body')
    const newRow = document.createElement('tr')
    newRow.className = 'padding'
    dogTable.append(newRow)

    const dogName = document.createElement('td')
    const dogBreed = document.createElement('td')
    const dogSex = document.createElement('td')

    const dogButtonTD = document.createElement('td')
    dogButtonTD.className = 'padding center'
    const dogButton = document.createElement('button')
    dogButton.addEventListener('click', (e) => handleEdit(dogObj))

    dogButton.textContent = 'edit dog'
    dogButtonTD.append(dogButton)

    dogName.textContent = dogObj.name
    dogName.className = 'padding center'
    dogBreed.textContent = dogObj.breed
    dogBreed.className = 'padding center'
    dogSex.textContent = dogObj.sex
    dogSex.className = 'padding center'


    newRow.append(dogName)
    newRow.append(dogBreed)
    newRow.append(dogSex)
    newRow.append(dogButtonTD)
}



//Handle edit dog buttons
function handleEdit(dogObj) {
    const formInputs = document.querySelectorAll('#dog-form input')
    formInputs[0].value = dogObj.name
    formInputs[0].id = dogObj.id
    formInputs[1].value = dogObj.breed
    formInputs[2].value = dogObj.sex
}

//Handle submit for edit form
const dogForm = document.getElementById('dog-form')
dogForm.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    let updatedDog = {
        name: e.target.name.value,
        breed: e.target.breed.value,
        sex: e.target.sex.value
    }
    fetch(`${dogAPI}/${e.target.name.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(updatedDog)
    })
        .then(res => res.json())
        .then(() => initialFetch())
}