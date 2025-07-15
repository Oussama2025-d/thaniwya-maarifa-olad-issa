// يمكنك إضافة أكواد جافاسكريبت هنا
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الموقع بنجاح!');
    
    // مثال: تغيير لون البطاقات عند المرور عليها
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'scale(1)';
        });
    });
});