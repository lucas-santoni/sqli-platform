/* global $, axios */

const arraysAreEqual = (a1, a2) =>
  a1.length === a2.length && a1.every((value, index) => value === a2[index]);

let previousResults = [];
let previousQuery = null;

const updateResults = (results, error) => {
  if (error) return;

  if (results.length === 0) {
    $('#results').empty();
    $('#results').append('<p id="no-results">...</p>');
  }

  if (arraysAreEqual(previousResults, results)) return;

  $('#results').empty();
  results.map(e => {
    $('#results').append(`
        <div class="result">
          <h3>${e.nickname}</h3>

          <ul>
            <li>Mail address: <code>${e.email}</code></li>
            <li>Identifier: <code>${e.id}</code></li>
          </ul>
        </div>`);
  });

  previousResults = results;
};

const updateQuery = (query, error) => {
  if ((!query && !error) || (previousQuery === query && !error)) return;

  if (error) {
    $('span#sql-request-content').text('This query is invalid...');
  } else {
    $('span#sql-request-content').text(query);
  }

  previousQuery = query;
};

const main = () => {
  $('#request').on('input', async () => {
    const q = $('#request').val();
    if (!q) {
      $('#results').empty();
      $('span#sql-request-content').text('...');
      return;
    }

    let { res, que, err } = {};
    try {
      const r = await axios.get(
        window.location.origin + '/q/' + encodeURIComponent(q));
      const { results, query } = r.data;

      res = results;
      que = query;
    } catch (e) {
      console.error(e);
      err = e;
    }

    updateResults(res, err);
    updateQuery(que, err);
  });
};

main();
