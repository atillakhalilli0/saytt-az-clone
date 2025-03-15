const navelements = {
    "websites": [
        {
            icon: '<i class="fa-solid fa-desktop"></i>',
            title: 'Saytların hazırlanması'
        },
        {
            icon: '<i class="fa-solid fa-place-of-worship"></i>',
            title: 'Hökumət və Qeyri-kommersiya Saytları'
        },
        {
            icon: '<i class="fa-solid fa-briefcase"></i>',
            title: 'Kiçik biznes saytları'
        },
        {
            icon: '<i class="fa-solid fa-pager"></i>',
            title: 'E-ticarət saytları'
        },
        {
            icon: '<i class="fa-solid fa-scale-balanced"></i>',
            title: 'Hüquq firma saytı'
        },
        {
            icon: '<i class="fa-solid fa-comment"></i>',
            title: 'Bloqlar və Şəxsi Vebsayt'
        },
        {
            icon: '<i class="fa-solid fa-house"></i>',
            title: 'Daşınmaz əmlak veb saytı'
        },
        {
            icon: '<i class="fa-solid fa-laptop-medical"></i>',
            title: 'Tibb - Doktor Saytlar'
        },
        {
            icon: '<i class="fa-brands fa-wordpress"></i>',
            title: 'Bloqlar və Şəxsi Vebsayt'
        },
        {
            icon: '<i class="fa-solid fa-bars"></i>',
            title: 'WordPress Saytları'
        },
    ],
    "domains": [
        {
            icon: '<i class="fa-solid fa-globe"></i>',
            title: 'Domen'
        },
        {
            icon: '<i class="fa-solid fa-gift"></i>',
            title: 'Pulsuz Domen Qeydiyyatı'
        },
    ],
    "hosting": [
        {
            icon: '<i class="fa-solid fa-server"></i>',
            title: 'Veb Hostinq'
        },
        {
            icon: '<i class="fa-solid fa-cloud"></i>',
            title: 'VPS'
        },
        {
            icon: '<i class="fa-solid fa-database"></i>',
            title: 'Server'
        },
    ],
    "services": [
        {
            icon: '<i class="fa-solid fa-eye"></i>',
            title: 'Vebsayt sifarişinizi izləyin'
        },
        {
            icon: '<i class="fa-solid fa-calculator"></i>',
            title: 'Sayt Kalkulyatoru'
        },
        {
            icon: '<i class="fa-solid fa-magnifying-glass-chart"></i>',
            title: 'SEO Xidməti'
        },
        {
            icon: '<i class="fa-solid fa-mobile-screen-button"></i>',
            title: 'Mobil Tətbiqlərin Hazırlanması'
        },
        {
            icon: '<i class="fa-solid fa-screwdriver-wrench"></i>',
            title: 'Texniki Xidmət'
        },
        {
            icon: '<i class="fa-solid fa-bullhorn"></i>',
            title: 'Sosial Media Marketinq'
        },
        {
            icon: '<i class="fa-solid fa-cloud"></i>',
            title: 'VPS'
        },
    ],
    "company": [
        {
            icon: '<i class="fa-solid fa-building"></i>',
            title: 'Haqqımızda'
        },
        {
            icon: '<i class="fa-solid fa-rss"></i>',
            title: 'Bloq'
        },
        {
            icon: '<i class="fa-solid fa-lightbulb"></i>',
            title: 'Bütün StartUPlar'
        },
        {
            icon: '<i class="fa-solid fa-briefcase"></i>',
            title: 'Portfolio'
        },
        {
            icon: '<i class="fa-solid fa-user-tie"></i>',
            title: 'Karyera'
        },
        {
            icon: '<i class="fa-solid fa-laptop-code"></i>',
            title: 'Freelance'
        },
        {
            icon: '<i class="fa-solid fa-envelope"></i>',
            title: 'Əlaqə Forması'
        },
    ]
};


const dropdownLabels = document.querySelectorAll(".dropdownLabel")
const dropdown = document.getElementById("dropdown")

document.querySelectorAll("[data-dropdown-label]").forEach(label => {
    label.addEventListener("click", function () {
        const dropdownKey = this.getAttribute("data-dropdown-label")
        const dropdownMenu = document.querySelector(`[data-dropdown="${dropdownKey}"]`)

        if (!dropdownMenu) return

        document.querySelectorAll(".dropdown-menu").forEach(menu => {
            if (menu !== dropdownMenu) menu.classList.add("hidden")
        })

        dropdownMenu.classList.toggle("hidden");

        dropdownMenu.innerHTML = navelements[dropdownKey]
            .map(item => `
                <div class="flex items-center gap-5 px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-800">
                    <div class="bg-blue-100 py-2 px-3 text-purple-700 text-xl rounded-lg">${item.icon}</div>
                    <div>
                        <p class="text-lg font-normal">${item.title}</p>
                    </div>
                </div>`)
            .join("")
    })
})

document.addEventListener("click", function (event) {
    if (!event.target.closest("[data-dropdown-label]") && !event.target.closest(".dropdown-menu")) {
        document.querySelectorAll(".dropdown-menu").forEach(menu => menu.classList.add("hidden"))
    }
})

document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu')
    mobileMenu.classList.toggle('hidden')
})

document.querySelectorAll("[data-mobile-dropdown-label]").forEach(label => {
    label.addEventListener("click", function () {
        const dropdownKey = this.getAttribute("data-mobile-dropdown-label")
        const dropdownMenu = this.querySelector(`[data-mobile-dropdown="${dropdownKey}"]`)
        
        if (!dropdownMenu) return
        document.querySelectorAll("[data-mobile-dropdown-label]").forEach(otherLabel => {
            if (otherLabel !== this) {
                const otherDropdownKey = otherLabel.getAttribute("data-mobile-dropdown-label")
                const otherDropdownMenu = otherLabel.querySelector(`[data-mobile-dropdown="${otherDropdownKey}"]`)
                
                if (otherDropdownMenu && !otherDropdownMenu.classList.contains("hidden")) {
                    otherDropdownMenu.classList.add("hidden")
                    
                    const otherIcon = otherLabel.querySelector("i")
                    if (otherIcon) {
                        otherIcon.classList.remove("fa-chevron-up")
                        otherIcon.classList.add("fa-chevron-down")
                    }
                }
            }
        })

        const icon = this.querySelector("i")
        if (icon) {
            icon.classList.toggle("fa-chevron-down")
            icon.classList.toggle("fa-chevron-up")
        }
        dropdownMenu.classList.toggle("hidden")
        
        if (!dropdownMenu.innerHTML.trim()) {
            dropdownMenu.innerHTML = navelements[dropdownKey]
                .map(item => `
                    <div class="flex items-center gap-3 py-2 cursor-pointer text-gray-800">
                        <div class="bg-blue-100 py-1 px-2 text-purple-700 text-base rounded-lg">${item.icon}</div>
                        <p class="text-base font-normal">${item.title}</p>
                    </div>`)
                .join("")
        }
    })
})

const circle = document.getElementById('animated-circle')
    let position = 0
    let direction = 1
      
    function animate() {
    position += 0.01 * direction
        
    if (position >= 1) {
        direction = -1
        position = 1
    } else if (position <= 0) {
          direction = 1
          position = 0
    }
        
    const yPos = 1 + (position * 45)
        
    circle.style.top = `${yPos}px`
        
    requestAnimationFrame(animate)
}
animate()