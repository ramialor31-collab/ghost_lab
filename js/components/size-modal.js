/**
 * GHOST LAB — Size Guide Modal Component
 */

export function initSizeModal(overlayId) {
  const overlay = document.getElementById(overlayId);
  if (!overlay) return;

  overlay.innerHTML = `
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="size-modal-title">
      <div class="modal-header">
        <h3 class="modal-title" id="size-modal-title">Streetwear Size Guide (CM)</h3>
        <button class="modal-close-btn" id="close-size-modal-btn" aria-label="Close size guide">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">
          GHOST LAB pieces are cut with an authentic <strong>boxy, drop-shoulder oversized streetwear silhouette</strong>. For a true oversized aesthetic, order your normal size. If you prefer a fitted look, choose one size down.
        </p>

        <h4 style="font-size: 1rem; color: var(--accent-white); margin-top: 18px;">Oversized Heavyweight T-Shirts (280 GSM)</h4>
        <table class="size-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest (cm)</th>
              <th>Length (cm)</th>
              <th>Shoulder (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>S</td><td>56</td><td>71</td><td>54</td></tr>
            <tr><td>M</td><td>59</td><td>74</td><td>56</td></tr>
            <tr><td>L</td><td>62</td><td>77</td><td>58</td></tr>
            <tr><td>XL</td><td>65</td><td>80</td><td>60</td></tr>
            <tr><td>XXL</td><td>68</td><td>83</td><td>62</td></tr>
          </tbody>
        </table>

        <h4 style="font-size: 1rem; color: var(--accent-white); margin-top: 24px;">Heavyweight French Terry Hoodies (450 GSM)</h4>
        <table class="size-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest (cm)</th>
              <th>Length (cm)</th>
              <th>Sleeve (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>S</td><td>58</td><td>69</td><td>61</td></tr>
            <tr><td>M</td><td>61</td><td>72</td><td>63</td></tr>
            <tr><td>L</td><td>64</td><td>75</td><td>65</td></tr>
            <tr><td>XL</td><td>67</td><td>78</td><td>67</td></tr>
            <tr><td>XXL</td><td>70</td><td>81</td><td>69</td></tr>
          </tbody>
        </table>

        <div style="margin-top: 24px; padding: 14px; background-color: var(--bg-tertiary); border-radius: var(--radius-xs); border: 1px solid var(--border-subtle); font-size: 0.84rem; color: var(--text-secondary);">
          Need sizing advice? Message our atelier directly on <strong>WhatsApp at 0676870535</strong> with your height and weight for an exact recommendation.
        </div>
      </div>
    </div>
  `;

  const closeBtn = document.getElementById('close-size-modal-btn');

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });
}

export function openSizeModal(overlayId = 'size-modal-overlay') {
  const overlay = document.getElementById(overlayId);
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
