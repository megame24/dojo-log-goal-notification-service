const footerTemplate = (includeUnsubscribe) => {
  return `
          </div>
        </div>
        <div class="footer">
          ${includeUnsubscribe ? `<a href="#">Unsubscribe</a>` : ""}
          <p><span class="copy-left">&copy;</span> Dojologs. All Rights Reversed</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = footerTemplate;