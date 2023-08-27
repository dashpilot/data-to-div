import cheerio from 'cheerio';

function toDiv(data, config) {
    let html = '<div data-key="data">'; // Start wrapper div

    for (const key in data) {
      if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
        // If the value is an object, recursively process it
        html += `<div class="${key}" data-key="${key}">`; // Start wrapper div
        html += toDiv(data[key], config, key);
        html += '</div>'; // End wrapper div
      } else if (Array.isArray(data[key])) {
        // If the value is an array, process each item in the array
        html += `<div class="${key}" data-key="${key}">`; // Start wrapper div
        let i = 0;
        for (const item of data[key]) {
          html += `<div class="${singularize(key)}" data-index="${i}" data-key="${key}">`; // Start item wrapper div
          html += toDiv(item, config, key);
          html += '</div>'; // End item wrapper div
          i++;
        }
        html += '</div>'; // End wrapper div
      } else {
        // If the value is a primitive, create an HTML element for it
        const tag = config[key] ? config[key].toLowerCase() : 'div';
        html += `<${tag} data-key="${key}">${data[key]}</${tag}>`;
      }
    }

    html += '</div>'; // End wrapper div

    return html;
}

function toData(html) {
  const $ = cheerio.load(html);
  const data = {};

  $('div[data-key="data"]').children().each(function() {
    const key = $(this).data('key');
    if ($(this).children().length > 0) {
      // If the element has children, recursively process them
      if ($(this).attr('data-index') !== undefined) {
        // If the element has a 'data-index' attribute, treat it as an array item
        if (!data[key]) {
          // If the array doesn't exist yet, create it
          data[key] = [];
        }
        data[key].push(toData($(this).html()));
      } else {
        // Otherwise, treat it as an object
        data[key] = toData($(this).html());
      }
    } else {
      // If the element has no children, get its text
      data[key] = $(this).text();
    }
  });

  return data;
}

function singularize(word) {
  const endings = {
    ves: 'fe',
    ies: 'y',
    i: 'us',
    zes: 'ze',
    ses: 's',
    es: 'e',
    s: ''
  };
  return word.replace(
    new RegExp(`(${Object.keys(endings).join('|')})$`), 
    r => endings[r]
  );
}

export {toDiv, toData}