document.addEventListener('DOMContentLoaded', () => {
    const seatForm = document.getElementById('seatForm');
    const resultOverlay = document.getElementById('resultOverlay');
    const resultCard = document.getElementById('resultCard');
    const closeBtn = document.getElementById('closeBtn');

    // UI Elements for Display
    const roomDisplay = document.getElementById('roomDisplay');
    const subjectDisplay = document.getElementById('subjectDisplay');
    const deptDisplay = document.getElementById('deptDisplay');
    const rollDisplay = document.getElementById('rollDisplay');

    // Form Inputs
    const rollNoInput = document.getElementById('rollNo');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const errorMsg = document.getElementById('errorMsg');

    // Dummy Configuration Mapping (semesters 1–8)
    const subjectsMap = {
        'AIDS': {
            '1': 'Mathematics I',
            '2': 'Data Structures',
            '3': 'Machine Learning',
            '4': 'Database Management Systems',
            '5': 'Elective A',
            '6': 'Elective B',
            '7': 'Project Work',
            '8': 'Industrial Training'
        },
        'CS': {
            '1': 'Physics',
            '2': 'Algorithms',
            '3': 'Operating Systems',
            '4': 'Cloud Computing',
            '5': 'AI Fundamentals',
            '6': 'Computer Vision',
            '7': 'Capstone Project',
            '8': 'Seminar'
        },
        'IT': {
            '1': 'Communication Skills',
            '2': 'Computer Networks',
            '3': 'Software Engineering',
            '4': 'Cyber Security',
            '5': 'Web Technologies',
            '6': 'Database Systems',
            '7': 'Mobile Development',
            '8': 'Cloud Services'
        },
        'MECH': {
            '1': 'Engineering Mechanics',
            '2': 'Thermodynamics',
            '3': 'Fluid Mechanics',
            '4': 'Automobile Engineering',
            '5': 'Manufacturing Processes',
            '6': 'Heat Transfer',
            '7': 'Robotics',
            '8': 'Internship'
        }
    };

    seatForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reset Error State
        rollNoInput.classList.remove('error-shake');
        errorMsg.classList.add('hidden');

        // Retrieve values
        const rollNo = parseInt(rollNoInput.value);
        const department = document.getElementById('department').value;
        const semester = document.getElementById('semester').value;

        // Validation with Shake Animation
        if (isNaN(rollNo) || rollNo <= 0) {
            rollNoInput.classList.add('error-shake');
            errorMsg.classList.remove('hidden');

            // Remove animation class after it completes so it can be re-triggered
            setTimeout(() => {
                rollNoInput.classList.remove('error-shake');
            }, 500);
            return;
        }

        // --- Loading State Animation ---
        btnText.classList.add('opacity-0');
        btnLoader.classList.remove('hidden');
        submitBtn.disabled = true;
        submitBtn.classList.add('cursor-not-allowed', 'opacity-90');

        // Simulate a brief network/calculation delay for premium feel
        setTimeout(() => {

            // --- Core Allocation Logic (30 Students per class) ---
            const roomIndex = Math.ceil(rollNo / 30);

            // Determine Prefix
            let prefix = 'EL';
            if (department === 'CS') prefix = 'CS';
            if (department === 'IT') prefix = 'IT';
            if (department === 'MECH') prefix = 'ME';

            // Base Room Starting Number
            const baseRoomStart = 205;
            const finalRoomNumber = baseRoomStart + roomIndex;

            // Construct Strings
            const finalRoomStr = `${prefix}-${finalRoomNumber}`;
            const finalSubjectStr = (subjectsMap[department] && subjectsMap[department][semester])
                ? subjectsMap[department][semester]
                : 'General Examination';

            // --- Update UI Modal ---
            roomDisplay.textContent = finalRoomStr;
            subjectDisplay.textContent = finalSubjectStr;
            deptDisplay.textContent = `${department} (Sem ${semester})`;
            rollDisplay.textContent = rollNo;

            // Show Overlay
            resultOverlay.classList.remove('hidden');
            resultOverlay.classList.add('flex');

            // Subtly delay card entrance for visual impact
            setTimeout(() => {
                resultCard.classList.remove('scale-95', 'opacity-0', 'translate-y-4');
                resultCard.classList.add('scale-100', 'opacity-100', 'translate-y-0');
            }, 50);

            // Restore Button State
            btnText.classList.remove('opacity-0');
            btnLoader.classList.add('hidden');
            submitBtn.disabled = false;
            submitBtn.classList.remove('cursor-not-allowed', 'opacity-90');

        }, 800); // 800ms simulated loading time
    });

    // Close Modal Logic
    const closeModal = () => {
        resultCard.classList.remove('scale-100', 'opacity-100', 'translate-y-0');
        resultCard.classList.add('scale-95', 'opacity-0', 'translate-y-4');

        // Wait for card animation to finish before hiding overlay
        setTimeout(() => {
            resultOverlay.classList.add('hidden');
            resultOverlay.classList.remove('flex');
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);

    // Close on backdrop click
    resultOverlay.addEventListener('click', (e) => {
        if (e.target === resultOverlay) {
            closeModal();
        }
    });
});
