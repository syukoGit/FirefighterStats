enum EFirefighterRank {
    Sapeur2EmeClasse = 'Sapeur 2ème classe',
    Sapeur1EmeClasse = 'Sapeur 1ère classe',
    Caporal = 'Caporal',
    CaporalChef = 'Caporal chef',
    Sergent = 'Sergent',
    SergentChef = 'Sergent chef',
    Adjudant = 'Adjudant',
    AdjudantChef = 'Adjudant chef',
    Major = 'Major',
    Lieutenant = 'Lieutenant',
    Capitaine = 'Capitaine',
    Commandant = 'Commandant',
    LieutenantColonel = 'Lieutenant colonel',
    Colonel = 'Colonel',
}

export function getDisplayName(key: keyof typeof EFirefighterRank) {
    return EFirefighterRank[key];
}

export default EFirefighterRank;
