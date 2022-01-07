

const cats = ['Afghan', 'African', 'Andalusian', 'Arabic', 'Argentine', 'Armenian', 'Asian Fusion', 
'Asturian', 'Australian', 'Austrian', 'Baguettes', 'Bangladeshi', 'Basque', 'Bavarian', 'Barbeque', 'Beer Garden', 
'Beer Hall', 'Beisl', 'Belgian', 'Bistros', 'Black Sea', 'Brasseries', 'Brazilian', 'Breakfast & Brunch', 'British', 
'Buffets', 'Bulgarian', 'Burgers', 'Burmese', 'Cafes', 'Cafeteria', 'Cajun/Creole', 'Cambodian', 'Canteen', 
'Caribbean', 'Catalan', 'Cheesesteaks', 'Chicken Wings', 'Chicken Shop', 'Chilean', 'Chinese', 'Comfort Food', 
'Corsican', 'Creperies', 'Cuban', 'Curry Sausage', 'Cypriot', 'Czech', 'Czech/Slovakian', 'Danish', 'Delis', 
'Diners', 'Dinner Theater', 'Dumplings', 'Eastern European', 'Parent Cafes', 'Eritrean', 'Ethiopian', 'Filipino', 
'Fischbroetchen', 'Fish & Chips', 'Flatbread', 'Fondue', 'Food Court', 'Food Stands', 'Freiduria', 'French', 'Galician', 
'Game Meat', 'Gastropubs', 'Georgian', 'German', 'Giblets', 'Gluten-Free', 'Greek', 'Guamanian', 'Halal', 'Hawaiian', 
'Heuriger', 'Himalayan/Nepalese', 'Hong Kong Style Cafe', 'Honduran', 'Hot Dogs', 'Fast Food', 'Hot Pot', 'Hungarian', 
'Iberian', 'Indonesian', 'Indian', 'International', 'Irish', 'Island Pub', 'Israeli', 'Italian', 'Japanese', 'Jewish', 
'Kebab', 'Kopitiam', 'Korean', 'Kosher', 'Kurdish', 'Laos', 'Laotian', 'Latin American', 'Lyonnais', 'Malaysian', 
'Meatballs', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Milk Bars', 'Modern Australian', 'Modern European', 
'Mongolian', 'Moroccan', 'American (New)', 'Canadian (New)', 'New Mexican Cuisine', 'New Zealand', 'Nicaraguan', 
'Night Food', 'Nikkei', 'Noodles', 'Norcinerie', 'Traditional Norwegian', 'Open Sandwiches', 'Oriental', 'Pakistani', 
'Pan Asian', 'Parma', 'Persian/Iranian', 'Peruvian', 'PF/Comercial', 'Pita', 'Pizza', 'Polish', 'Polynesian', 
'Pop-Up Restaurants', 'Portuguese', 'Potatoes', 'Poutineries', 'Pub Food', 'Live/Raw Food', 'Rice', 'Romanian', 
'Rotisserie Chicken', 'Russian', 'Salad', 'Sandwiches', 'Scandinavian', 'Schnitzel', 'Scottish', 'Seafood', 
'Serbo Croatian', 'Signature Cuisine', 'Singaporean', 'Slovakian', 'Somali', 'Soul Food', 'Soup', 'Southern', 
'Spanish', 'Sri Lankan', 'Steakhouses', 'French Southwest', 'Supper Clubs', 'Sushi Bars', 'Swabian', 'Swedish', 
'Swiss Food', 'Syrian', 'Tabernas', 'Taiwanese', 'Tapas Bars', 'Tapas/Small Plates', 'Tavola Calda', 'Tex-Mex', 
'Thai', 'American (Traditional)', 'Traditional Swedish', 'Trattorie', 'Turkish', 'Ukrainian', 'Uzbek', 'Vegan', 
'Vegetarian', 'Venison', 'Vietnamese', 'Waffles', 'Wok', 'Wraps', 'Yugoslav']



document.querySelector('#cats').innerHTML 


const createDropDownOptions = cats => {
        for (let food of cats) {
        document.querySelector('#cats')
        .insertAdjacentHTML('beforeend', `<select value=${food}>${food}</option>`);
    }
};