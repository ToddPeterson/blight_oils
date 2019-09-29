const passive_list = document.getElementById('passive-list');
const passive_input = document.getElementById('passive-input');
const recipe_divs = document.getElementsByClassName('oil');

let amulet_data = {};

// Get recipe data
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            amulet_data = JSON.parse(xhr.responseText);
            populate_datalist();
        }
    }
}
xhr.open('GET', 'amulet_data.json');
xhr.send();

function populate_datalist() {
    // populate datalist with passive values
    let option_str = '';
    for (let passive in amulet_data) {
        option_str += '<option value="' + passive + '" />';
    }
    passive_list.innerHTML = option_str;
}

passive_input.addEventListener('input', () => {
    const passive = passive_input.value;
    const recipe = amulet_data[passive];
    console.log(recipe);
    for (let i = 0; i < 3; i++) {
        let ingredient = recipe[i];
        let oil_text = recipe_divs[i].children[0];

        if (oil_text.textContent != '') {
            recipe_divs[i].classList.toggle('oil-' + oil_text.textContent);
        }
        recipe_divs[i].classList.toggle('oil-' + ingredient.toLowerCase());

        oil_text.textContent = recipe[i];
    }
});
