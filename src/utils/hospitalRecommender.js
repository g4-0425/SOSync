/**
 * SOSync Smart Hospital Recommendation Algorithm
 * Rule & Scoring-Based Logic evaluating:
 * 1. Emergency Type suitability match
 * 2. Severity/Priority scale
 * 3. ICU Bed Availability
 * 4. General Bed Occupancy ratio
 * 5. Operational Status (Ready vs Operational vs Full Capacity)
 * 6. Sector Proximity match
 */

export function recommendHospitals(emergencyReport, hospitals = []) {
  if (!hospitals || hospitals.length === 0) {
    return { primary: null, alternatives: [] };
  }

  const { emergencyType = 'General Emergency', priority = 'High', sector = 'Sector 22' } = emergencyReport;

  const scoredHospitals = hospitals.map(hosp => {
    let score = 50; // Base score

    // 1. Operational Status Check
    if (hosp.status === 'Full Capacity') {
      score -= 40;
    } else if (hosp.status === 'Ready' || hosp.status === 'Operational') {
      score += 20;
    }

    // 2. ICU Beds Check (Critical for High/Critical Priorities)
    if (priority === 'Critical' || priority === 'High') {
      if (hosp.icuBeds > 5) score += 25;
      else if (hosp.icuBeds > 0) score += 12;
      else score -= 30; // Heavy penalty if 0 ICU beds for critical patients
    }

    // 3. Bed Occupancy & Availability
    if (hosp.bedsAvailable > 20) score += 15;
    else if (hosp.bedsAvailable > 5) score += 8;
    else score -= 15;

    // 4. Specialization & Emergency Type Match
    const typeLower = emergencyType.toLowerCase();
    const hospNameLower = hosp.name.toLowerCase();
    const specLower = (hosp.specialties || []).join(' ').toLowerCase();

    if (typeLower.includes('accident') || typeLower.includes('trauma')) {
      if (hospNameLower.includes('pgimer') || hospNameLower.includes('fortis') || specLower.includes('trauma')) {
        score += 25;
      }
    } else if (typeLower.includes('cardiac') || typeLower.includes('heart')) {
      if (hospNameLower.includes('gmch') || hospNameLower.includes('max') || specLower.includes('cardio')) {
        score += 25;
      }
    } else if (typeLower.includes('fire') || typeLower.includes('burn')) {
      if (hospNameLower.includes('pgimer') || hospNameLower.includes('gmch')) {
        score += 20;
      }
    }

    // 5. Sector Distance Proximity Match
    if (hosp.sector === sector) {
      score += 15;
    }

    // Generate specific suitability rationale
    let suitabilityReason = 'Optimal general emergency response capacity.';
    if (hosp.icuBeds > 5 && (priority === 'Critical' || priority === 'High')) {
      suitabilityReason = `High ICU capacity (${hosp.icuBeds} beds ready) & specialized advanced trauma ward.`;
    } else if (hosp.sector === sector) {
      suitabilityReason = `Closest proximity (${hosp.sector}) with ${hosp.bedsAvailable} available ER beds.`;
    } else if (hosp.bedsAvailable > 20) {
      suitabilityReason = `Maximum bed availability (${hosp.bedsAvailable} ER beds open) & 24/7 specialist team.`;
    }

    return {
      ...hosp,
      recommendationScore: score,
      suitabilityReason
    };
  });

  // Sort descending by score
  scoredHospitals.sort((a, b) => b.recommendationScore - a.recommendationScore);

  const primary = scoredHospitals[0] || null;
  const alternatives = scoredHospitals.slice(1, 3);

  return {
    primary,
    alternatives
  };
}
