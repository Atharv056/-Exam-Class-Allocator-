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

    // Dummy Configuration Mapping
    const subjectsMap = {
        'AIDS': { 'I': 'Mathematics I', 'II': 'Data Structures', 'III': 'Machine Learning', 'IV': 'Database Management Systems' },
        'CS': { 'I': 'Physics', 'II': 'Algorithms', 'III': 'Operating Systems', 'IV': 'Cloud Computing' },
        'IT': { 'I': 'Communication Skills', 'II': 'Computer Networks', 'III': 'Software Engineering', 'IV': 'Cyber Security' },
        'MECH': { 'I': 'Engineering Mechanics', 'II': 'Thermodynamics', 'III': 'Fluid Mechanics', 'IV': 'Automobile Engineering' }
    };

    seatForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reset Error State
        rollNoInput.classList.remove('error-shake');
        errorMsg.classList.add('hidden');

        // Retrieve values
        const rollNo = parseInt(rollNoInput.value);
        const department = document.getElementById('department').value;
        const year = document.getElementById('year').value;

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
            const finalSubjectStr = (subjectsMap[department] && subjectsMap[department][year])
                ? subjectsMap[department][year]
                : 'General Examination';

            // --- Update UI Modal ---
            roomDisplay.textContent = finalRoomStr;
            subjectDisplay.textContent = finalSubjectStr;
            deptDisplay.textContent = `${department} (${year})`;
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
