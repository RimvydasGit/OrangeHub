document.addEventListener('DOMContentLoaded', () => {
  const galleryBody = document.getElementById('galleryBody');
  const modalBody = document.getElementById('modalTableBody');
  const modalLoading = document.getElementById('modalLoading');
  const modalTableContainer = document.getElementById('modalTableContainer');

  function loadContributions(filterType = null, target = 'main') {
    const url = filterType
      ? `/contributions?type=${encodeURIComponent(filterType)}`
      : '/contributions';

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const isModal = target === 'modal';
        const tbody = isModal ? modalBody : galleryBody;
        tbody.innerHTML = '';
        if (isModal) {
          modalLoading.classList.remove('d-none');
          modalTableContainer.classList.add('d-none');
        }

        data.forEach(entry => {
          const tr = document.createElement('tr');
          const filePath = entry.file_name ? `/uploads/${entry.file_name}` : null;
          const isImage = filePath && /\.(jpe?g|png|gif|webp)$/i.test(filePath);

          tr.innerHTML = isModal
            ? `
              <td>${new Date(entry.contribution_date).toLocaleDateString()}</td>
              <td>
                ${
                  filePath
                    ? isImage
                      ? `<img src="${filePath}" class="media" style="max-width:100px" alt="Uploaded">`
                      : `<a href="${filePath}" target="_blank">Download</a>`
                    : '—'
                }
              </td>
              <td>${entry.farm_name}</td>
              <td>${entry.country}</td>
              <td>${entry.description}</td>
              <td>${entry.certified_organic ? 'Yes' : 'No'}</td>
            `
            : `
              <td data-value="${entry.contribution_date}">
                ${new Date(entry.contribution_date).toLocaleDateString()}
              </td>
              <td>
                ${
                  filePath
                    ? isImage
                      ? `<img src="${filePath}" class="media" style="max-width:100px" alt="Uploaded">`
                      : `<a href="${filePath}" target="_blank">Download</a>`
                    : '—'
                }
              </td>
              <td>${entry.farm_name}</td>
              <td>${entry.country}</td>
              <td>${entry.orange_kind}</td>
              <td>${entry.description}</td>
              <td>${entry.certified_organic ? 'Yes' : 'No'}</td>
            `;
          tbody.appendChild(tr);
        });

        if (isModal) {
          modalLoading.classList.add('d-none');
          modalTableContainer.classList.remove('d-none');
        }

        if (!isModal) {
          const getCellValue = (row, index) => {
            const cell = row.children[index];
            return cell.dataset.value || cell.innerText || cell.textContent;
          };

          const comparer = (index, asc) => (a, b) => {
            const valA = getCellValue(asc ? a : b, index);
            const valB = getCellValue(asc ? b : a, index);

            const dateA = new Date(valA);
            const dateB = new Date(valB);
            if (!isNaN(dateA) && !isNaN(dateB)) return dateA - dateB;

            const numA = parseFloat(valA);
            const numB = parseFloat(valB);
            if (!isNaN(numA) && !isNaN(numB)) return numA - numB;

            return valA.localeCompare(valB, undefined, { numeric: true });
          };

          document.querySelectorAll('th.sortable').forEach(th => {
            th.style.cursor = 'pointer';
            th.addEventListener('click', () => {
              const table = th.closest('table');
              const tbody = table.querySelector('tbody');
              Array.from(tbody.querySelectorAll('tr'))
                .sort(comparer(th.dataset.column, th.asc = !th.asc))
                .forEach(tr => tbody.appendChild(tr));
            });
          });
        }

      })
      .catch(err => {
        console.error('Error loading contributions:', err);
        const fallbackHTML = '<tr><td colspan="7">Failed to load data</td></tr>';
        if (target === 'modal') {
          modalBody.innerHTML = fallbackHTML;
        } else {
          galleryBody.innerHTML = fallbackHTML;
        }
      });
  }

  loadContributions();

  document.querySelectorAll('.orange-clickable').forEach(img => {
    img.addEventListener('click', () => {
      const type = img.getAttribute('data-orange');

      modalLoading.classList.remove('d-none');
      modalTableContainer.classList.add('d-none');
      modalBody.innerHTML = '';

      loadContributions(type, 'modal');

      const modal = new bootstrap.Modal(document.getElementById('orangeModal'));
      modal.show();
    });
  });
});
