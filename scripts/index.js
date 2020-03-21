const people = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

const currentPeople = shuffledArray(people);

let $draggedPerson = null;

const $positions = document.getElementById('positions');

const $checkButton = document.getElementById('check-button');
$checkButton.addEventListener('click', checkPositions);

populatePositions();

function populatePositions() {
    currentPeople.forEach(person => {
        $positions.appendChild(createPositionDOM(person));
    });
}

function checkPositions() {
    Array.from($positions.children).forEach(checkPosition);
}

function checkPosition($position, index) {
    const positionPerson = $position.querySelector('.position-person').textContent;

    if (people[index] === positionPerson) {
        $position.classList.remove('is-wrong');
        $position.classList.add('is-correct');
    } else {
        $position.classList.remove('is-correct');
        $position.classList.add('is-wrong');
    }
}

function createPositionDOM(person) {
    const $position = document.createElement('li');
    $position.classList.add('position');

    const $positionBody = document.createElement('div');
    $positionBody.classList.add('position-body');
    $positionBody.draggable = true;

    const $positionPerson = document.createElement('p');
    $positionPerson.classList.add('position-person');
    $positionPerson.textContent = person;

    $positionBody.appendChild($positionPerson);

    const $dragIcon = document.createElement('span');
    $dragIcon.classList.add('fas', 'fa-grip-lines');

    $positionBody.appendChild($dragIcon);

    $position.appendChild($positionBody);

    $positionBody.addEventListener('dragstart', () => {
        $draggedPerson = $positionPerson;
    });

    $positionBody.addEventListener('dragenter', () => {
        $positionBody.classList.add('is-dragging-over');
    });

    $positionBody.addEventListener('dragleave', () => {
        $positionBody.classList.remove('is-dragging-over');
    });

    $positionBody.addEventListener('dragover', event => {
        event.preventDefault();
    });

    $positionBody.addEventListener('drop', () => {
        $positionBody.classList.remove('is-dragging-over');

        const temp = $positionPerson.textContent;
        $positionPerson.textContent = $draggedPerson.textContent;
        $draggedPerson.textContent = temp;

        $draggedPerson = null;
    });

    return $position;
}

function shuffledArray(array) {
    return array.map(value => ({ value, sort: Math.random() }))
        .sort((value1, value2) => value1.sort - value2.sort).map(({ value }) => value);
}
