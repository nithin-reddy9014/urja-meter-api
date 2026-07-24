const portal = require("../utils/portalClient");

class MeterService {
  async search(page = 1, q = "") {
    const response = await portal.request({
      method: "GET",
      url: "/portal/meters/search",
      params: { page, q },
    });

    return response.data;
  }

  async getMeter(id) {
    const [details, geo, energy] = await Promise.all([
      portal.request({
        method: "GET",
        url: `/meters/${id}/__data.json`,
      }),
      portal.request({
        method: "GET",
        url: `/portal/meters/${id}/geo`,
      }),
      portal.request({
        method: "GET",
        url: `/portal/meters/${id}/energy`,
      }),
    ]);

    const nodes = details.data.nodes || [];
    const meterNode = nodes[2]?.data || [];

    let installedMeter = {};

    try {
      installedMeter = JSON.parse(
        meterNode[2]?.classData || "{}",
      ).installed_meter;
    } catch {
      installedMeter = {};
    }

    const hierarchy = meterNode[4] || {};

    return {
      meter: {
        meterId: installedMeter.MeterId,
        serialNo: installedMeter.SerialNo,
        make: installedMeter.Make,
        phaseType: installedMeter.PhaseType,
        installationStatus: installedMeter.InstallationStatus,
        installationType: installedMeter.InstallationType,
      },
      hierarchy: {
        zone: hierarchy.Zone,
        circle: hierarchy.Circle,
        division: hierarchy.Division,
        subdivision: hierarchy.Subdivision,
        subStation: hierarchy["Sub Station"],
        feeder: hierarchy.Feeder,
        dt: hierarchy.DT,
      },
      location: geo.data,
      energy: energy.data,
    };
  }
}

module.exports = new MeterService();
