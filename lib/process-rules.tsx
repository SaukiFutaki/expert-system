interface Conditions {
    kondisi_tanah: string;
    beban_struktural: string;
}

export function processRules(conditions: Conditions): string {
    let recommendation = '';

    if (conditions.kondisi_tanah === 'berpasir') {
        recommendation = 'gunakan pondasi tiang';
    }

    if (conditions.beban_struktural === 'tinggi') {
        recommendation = 'gunakan beton bertulang';
    }

    if (recommendation === 'gunakan pondasi tiang' && conditions.beban_struktural === 'tinggi') {
        return 'gunakan pondasi tiang beton bertulang';
    }

    return recommendation;
}
