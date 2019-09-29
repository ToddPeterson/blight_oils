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
};
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

let active_recipe = false;

function submit_recipe() {
    const passive = passive_input.value;
    if (passive in amulet_data) {
        if (active_recipe) {
            clear_recipe();
        }
        set_recipe(passive);
        active_recipe = true;
    } else {
        if (active_recipe) {
            clear_recipe();
            active_recipe = false;
        }
    }
}

function set_recipe(name) {
    const recipe = amulet_data[name];
    for (let recipe_idx = 0; recipe_idx < 3; recipe_idx++) {
        let ingredient = recipe[recipe_idx];
        let oil_text = recipe_divs[recipe_idx].children[0];
        recipe_divs[recipe_idx].classList.add('oil-' + ingredient.toLowerCase());
        oil_text.textContent = recipe[recipe_idx];
    }
}

function clear_recipe() {
    for (let recipe_idx = 0; recipe_idx < 3; recipe_idx++) {
        // Remove oil class names
        recipe_divs[recipe_idx].classList.forEach(class_name => {
            if (class_name.startsWith('oil-')) {
                recipe_divs[recipe_idx].classList.remove(class_name);
            }
        });
        // Clear text
        recipe_divs[recipe_idx].children[0].textContent = '';
    }
}
