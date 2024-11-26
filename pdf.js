// Sample data for document search
const documents = [
    { title: "Marketing Plan", url: "pdf/marketing1.pdf", section: "marketingMaterialsSection" },
    { title: "Product Brochure", url: "pdf/marketing2.pdf", section: "marketingMaterialsSection" },
    { title: "Advertisement Templates", url: "pdf/marketing3.pdf", section: "marketingMaterialsSection" },
    { title: "Quarterly Report Q1", url: "pdf/report1.pdf", section: "businessReportsSection" },
    { title: "Annual Financial Report", url: "pdf/report2.pdf", section: "businessReportsSection" },
    { title: "Market Analysis Report", url: "pdf/report3.pdf", section: "businessReportsSection" },
    { title: "Employee Handbook", url: "pdf/training1.pdf", section: "trainingDocumentsSection" },
    { title: "Safety Procedures", url: "pdf/training2.pdf", section: "trainingDocumentsSection" },
    { title: "Onboarding Guide", url: "pdf/training3.pdf", section: "trainingDocumentsSection" }
  ];
  
  // Filter documents and display suggestions
  function filterDocuments(event) {
    const query = event.target.value.toLowerCase();
    const suggestions = document.getElementById("suggestions");
  
    if (query) {
      const filteredDocs = documents.filter(doc => doc.title.toLowerCase().includes(query));
      if (filteredDocs.length > 0) {
        suggestions.innerHTML = filteredDocs
          .map(doc => `<a href="javascript:void(0)" onclick="scrollToSection('${doc.section}', '${doc.url}')">${doc.title}</a>`)
          .join("");
        suggestions.style.display = "block";
      } else {
        suggestions.style.display = "none";
      }
    } else {
      suggestions.style.display = "none";
    }
  }
  
  // Scroll to the section and highlight the PDF
  function scrollToSection(sectionId, pdfUrl) {
    const sectionElement = document.getElementById(sectionId);
    const pdfLink = sectionElement.querySelector(`a[href='${pdfUrl}']`);
  
    // Scroll to the section
    sectionElement.scrollIntoView({ behavior: 'smooth' });
  
    // Highlight the PDF link
    pdfLink.style.backgroundColor = "#ff7b54";
    pdfLink.style.color = "#fff";
  
    // Remove the highlight after a few seconds
    setTimeout(() => {
      pdfLink.style.backgroundColor = "";
      pdfLink.style.color = "";
    }, 3000);
  }
  
  // Search function (optional if you want a search button)
  function searchDocuments() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const suggestions = document.getElementById("suggestions");
  
    const filteredDocs = documents.filter(doc => doc.title.toLowerCase().includes(query));
  
    if (filteredDocs.length > 0) {
      suggestions.innerHTML = filteredDocs
        .map(doc => `<a href="javascript:void(0)" onclick="scrollToSection('${doc.section}', '${doc.url}')">${doc.title}</a>`)
        .join("");
      suggestions.style.display = "block";
    } else {
      suggestions.style.display = "none";
    }
  }
  