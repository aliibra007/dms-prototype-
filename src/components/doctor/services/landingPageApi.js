// Landing Page API service - uses fetch pattern similar to mock services

const delay = (ms) => new Promise((r)=>setTimeout(r, ms))

let state = {
  header: {
    logo: '',
    heroImage: '',
    heroTitle: 'Welcome to Our Clinic',
    heroSubtitle: 'Compassionate care for everyone.'
  },
  staticImages: {
    top: { url: '', label: '' },
    middle: { url: '', label: '' },
    bottom: { url: '', label: '' },
  },
  treatments: [],
  footer: {
    logo: '', description: '', phone: '', email: '', address: '', copyright: ''
  }
}

export async function getLandingPageSettings() {
  await delay(200)
  return JSON.parse(JSON.stringify(state))
}

export async function updateHeaderSettings(data) {
  await delay(200)
  state.header = { ...state.header, ...data }
  return state.header
}

export async function updateStaticImages(data) {
  await delay(200)
  state.staticImages = { ...state.staticImages, ...data }
  return state.staticImages
}

export async function addTreatment(data) {
  await delay(200)
  const item = { id: Math.random().toString(36).slice(2), ...data }
  if (state.treatments.length >= 6) throw new Error('Limit reached')
  state.treatments.push(item)
  return item
}

export async function updateTreatment(id, data) {
  await delay(200)
  state.treatments = state.treatments.map(t=> t.id===id ? { ...t, ...data } : t)
  return state.treatments.find(t=>t.id===id)
}

export async function deleteTreatment(id) {
  await delay(200)
  state.treatments = state.treatments.filter(t=>t.id!==id)
  return { ok: true }
}

export async function updateFooterSettings(data) {
  await delay(200)
  state.footer = { ...state.footer, ...data }
  return state.footer
}
