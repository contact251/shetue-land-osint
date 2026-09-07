/**
 * SHETUE LAND OSINT TOOLKIT - ADMIN MANAGEMENT
 * Parcel creation, database export/import, and system reset
 */

const AdminManager = {
  openAddParcelModal() {
    const modal = document.getElementById("add-parcel-modal");
    if (modal) modal.classList.add("active");
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
  },

  handleParcelSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const areaDec = parseFloat(form.areaDecimal.value) || 0;
    const areaKatha = (areaDec * 435.6) / 720.0;
    const areaAcre = areaDec / 100.0;

    const newParcel = {
      id: form.parcelId.value.trim().toUpperCase(),
      mouza: form.mouza.value.trim(),
      jlNo: parseInt(form.jlNo.value) || 1,
      thana: form.thana.value.trim(),
      district: form.district.value.trim(),
      plotCS: form.plotCS.value.trim(),
      plotSA: form.plotSA.value.trim(),
      plotRS: form.plotRS.value.trim(),
      plotBS: form.plotBS.value.trim(),
      khatianCS: form.khatianCS.value.trim(),
      khatianSA: form.khatianSA.value.trim(),
      khatianRS: form.khatianRS.value.trim(),
      khatianBS: form.khatianBS.value.trim(),
      areaDecimal: areaDec,
      areaKatha: parseFloat(areaKatha.toFixed(2)),
      areaAcre: parseFloat(areaAcre.toFixed(4)),
      landClass: form.landClass.value,
      owner: form.owner.value.trim(),
      possessor: form.possessor.value.trim(),
      mutationCase: form.mutationCase.value.trim(),
      mutationKhatian: form.mutationKhatian.value.trim(),
      taxYear: form.taxYear.value.trim(),
      status: form.status.value,
      lat: parseFloat(form.lat.value) || 23.7845,
      lng: parseFloat(form.lng.value) || 90.4267,
      remarks: form.remarks.value.trim(),
      coordinates: [
        [parseFloat(form.lat.value) - 0.0002, parseFloat(form.lng.value) - 0.0002],
        [parseFloat(form.lat.value) - 0.0002, parseFloat(form.lng.value) + 0.0002],
        [parseFloat(form.lat.value) + 0.0002, parseFloat(form.lng.value) + 0.0002],
        [parseFloat(form.lat.value) + 0.0002, parseFloat(form.lng.value) - 0.0002]
      ]
    };

    window.dataManager.addParcel(newParcel);
    this.closeModal("add-parcel-modal");
    form.reset();

    // Re-render UI components
    window.app.renderAllTables();
    window.gisManager.renderParcels();
    window.app.showToast(`Parcel ${newParcel.id} successfully added to Master Register!`, "success");
  },

  exportDatabase() {
    const jsonStr = window.dataManager.exportJSON();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shetue_land_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    window.app.showToast("Database exported successfully!", "success");
  },

  importDatabase(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const success = window.dataManager.importJSON(e.target.result);
      if (success) {
        window.app.renderAllTables();
        window.gisManager.renderParcels();
        window.app.showToast("Database imported & restored successfully!", "success");
      } else {
        window.app.showToast("Error importing database: Invalid JSON schema", "danger");
      }
    };
    reader.readAsText(file);
  },

  resetDatabase() {
    if (confirm("Are you sure you want to reset the repository database to factory defaults? All custom changes will be overwritten.")) {
      window.dataManager.resetDefaults();
      window.app.renderAllTables();
      window.gisManager.renderParcels();
      window.app.showToast("Database successfully reset to defaults.", "info");
    }
  }
};

window.AdminManager = AdminManager;
