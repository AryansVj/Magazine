(function (global) {
    var dc = {};    // dc - david chu's

    var MagZ = "magazine.html";
    var main = "main.html"

    // Convinient function to insert html to a targeted elem 
    function insertHTML (selector, html) {      
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    // Loader function
    function showLoading (selector) {
        var html = '<div class="text-center">';
        html += '<img scr="https://media.giphy.com/media/tA4R6biK5nlBVXeR7w/giphy.gif" alt="loading-icon"></div>'; 
        insertHTML(selector, html);
    }

    // on first load, show home view
    document.addEventListener('DOMContentLoaded', function (event) {

        showLoading('#main-container');     // Loading Icon
        $ajaxUtils.sendGetRequest (
            main, 
            function (responseText){
                insertHTML('#main-container',responseText)
            },
            false)
    });

    // Load the menu categories view
    dc.loadMagazine = function () {
        showLoading('#main-container');
        switchMenuToActive();
        $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML, true);
    };

    // Load the menu items view
    dc.loadMenuItems = function (categoryShort) {
        showLoading('#main-container');
        switchMenuToActive();
        $ajaxUtils.sendGetRequest(menuItemsUrl + categoryShort, buildAndShowMenuItemsHTML, true);
    };

    // Build HTML for the categories page based on the data from the server
    function buildAndShowCategoriesHTML (categories) {
        $ajaxUtils.sendGetRequest(categoriesTileHTML, function (categoriesTileHTML) {
            $ajaxUtils.sendGetRequest(
                categoryHTML, 
                function (categoryHTML) {
                    var categoriesViewHtml = 
                        buildCategoriesViewHtml (categories, categoriesTileHTML, categoryHTML);
                    insertHTML('#main-container', categoriesViewHtml);
                },
                false);
        },
        false);
    }

    // Build Categories View Html to be inserted into the page
    function buildCategoriesViewHtml (categories, categoriesTileHTML, categoryHTML) {
        var finalHTML = categoriesTileHTML;
        finalHTML += "<section class='row'>";

        // Loop over categories
        for (var i = 0; i < categories.length; i++) {
            // Insert category values
            var html = categoryHTML;
            var name = "" + categories[i].name;
            var short_name = categories[i].short_name;
            html = insertProperty(html, "name", name);
            html = insertProperty(html, "short_name", short_name)
            
            finalHTML += html;
        }
        finalHTML += "</section>";
        return finalHTML;
    }
    // Builds HTML for the single category page based on the data from the server
    function buildAndShowMenuItemsHTML (categoryMenuItems) {
        $ajaxUtils.sendGetRequest(menuItemsTitleHTML, 
            function (menuItemsTitleHTML) {
                $ajaxUtils.sendGetRequest(menuItemsHTML,
                    function (menuItemsHTML) {
                        // Assign the finalHtml string to menuItemsView built by processing in buildMenuItemsViewHTML
                        var menuItemsViewHtml = buildMenuItemsViewHTML (categoryMenuItems, menuItemsTitleHTML, menuItemsHTML);
                        insertHTML ('#main-container', menuItemsViewHtml); 
                    },
                    false);
            },
            false);
    }

    function buildMenuItemsViewHTML (categoryMenuItems, menuItemsTitleHTML, menuItemsHTML) {
        menuItemsTitleHTML = insertProperty(
            menuItemsTitleHTML,
            "name",
            categoryMenuItems.category.name);
        menuItemsTitleHTML = insertProperty(menuItemsTitleHTML,
            "special_instructions",
            categoryMenuItems.category.special_instructions);
        
        var finalHTML = menuItemsTitleHTML;
        finalHTML += "<section class='row'>"

        // Loop over menu items
        var menuItems = categoryMenuItems.menu_items;
        var catShortName = categoryMenuItems.category.short_name;

        for (var i = 0; i < menuItems.length; i++) {
            // Insert menu item values
            var html = menuItemsHTML;
            html = insertProperty(html, "short_name", menuItems[i].short_name);
            html = insertProperty(html, "catShortName", catShortName);
            html = insertItemPrice(html, "price_small", menuItems[i].price_small);
            html = insertPortName(html, "small_portion_name", menuItems[i].small_portion_name);
            html = insertItemPrice(html, "price_large", menuItems[i].price_large);
            html = insertPortName(html, "large_portion_name", menuItems[i].large_portion_name);
            html = insertProperty(html, "name", menuItems[i].name);
            html = insertProperty(html, "description", menuItems[i].description);
        
            // Add clearfix after eveery second menu item tile
            if (i % 2 != 0) {
                html += '<div class="clearfix visible-md-block visible-lg-block"></div>'
            }

            finalHTML += html
        }

        finalHTML += "</section>";
        return finalHTML
    }

    // for item price - append with a $ 
    function insertItemPrice (html, pricePropName, priceValue) {
        
        if (!priceValue) {      // If price is not secified replace with an empty string
            return insertProperty (html, pricePropName, "");
        }

        priceValue = "$" + priceValue.toFixed(2);   // to 2 decimal places
        html = insertProperty(html, pricePropName, priceValue);
        return html;
    }

    function insertPortName (html, portionPropName, portionValue) {
        
        if (!portionValue) {      // If portion name is not secified replace with an empty string
            return insertProperty (html, portionPropName, "");
        }

        portionValue = "(" + portionValue + ")";
        html = insertProperty(html, portionPropName, portionValue);
        return html;
    }

    global.$dc = dc;
    
}) (window);