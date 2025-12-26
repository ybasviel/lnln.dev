interface Particle {
	element: HTMLDivElement;
	x: number;
	y: number;
	vx: number;
	vy: number;
	size: number;
	grounded: boolean;
}

interface PixelBurstOptions {
	distance?: number;
	particleSize?: number;
	particleCount?: number;
	burstDuration?: number;
	gravity?: number;
	bounceFactor?: number;
	friction?: number;
}

const defaultOptions: Required<PixelBurstOptions> = {
	distance: 60,
	particleSize: 8,
	particleCount: 12,
	burstDuration: 300,
	gravity: 0.5,
	bounceFactor: 0.1,
	friction: 0.98
};

// すべてのパーティクルを管理
const particles: Particle[] = [];
let animationId: number | null = null;
let groundedParticles: HTMLDivElement[] = [];

// ページの一番下のY座標を取得
function getPageBottom(): number {
	return Math.max(
		document.body.scrollHeight,
		document.documentElement.scrollHeight,
		document.body.offsetHeight,
		document.documentElement.offsetHeight
	);
}

import '../style/pixelBurst.css';


// 物理シミュレーションのアニメーションループ
function updatePhysics() {
	const pageBottom = getPageBottom();
	let hasMovingParticles = false;

	for (const particle of particles) {
		if (particle.grounded) continue;

		// 重力を適用
		particle.vy += defaultOptions.gravity;

		// 速度を適用
		particle.x += particle.vx;
		particle.y += particle.vy;

		// 摩擦を適用
		particle.vx *= defaultOptions.friction;

		// 壁との衝突判定（ページ幅）
		const pageWidth = document.documentElement.scrollWidth;
		if (particle.x < particle.size / 2) {
			particle.x = particle.size / 2;
			particle.vx *= -defaultOptions.bounceFactor;
		} else if (particle.x > pageWidth - particle.size / 2) {
			particle.x = pageWidth - particle.size / 2;
			particle.vx *= -defaultOptions.bounceFactor;
		}

		// 地面との衝突判定（ページの一番下）
		const groundLevel = findGroundLevel(particle, pageBottom);
		if (particle.y >= groundLevel - particle.size / 2) {
			particle.y = groundLevel - particle.size / 2;
			particle.vy *= -defaultOptions.bounceFactor;

			// 速度が十分に小さくなったら停止
			if (Math.abs(particle.vy) < 1 && Math.abs(particle.vx) < 0.5) {
				particle.grounded = true;
				particle.vx = 0;
				particle.vy = 0;
				groundedParticles.push(particle.element);
			}
		}

		// 要素の位置を更新
		particle.element.style.left = `${particle.x}px`;
		particle.element.style.top = `${particle.y}px`;
		particle.element.style.transform = 'translate(-50%, -50%)';

		if (!particle.grounded) {
			hasMovingParticles = true;
		}
	}

	// 動いているパーティクルがある場合は続ける
	if (hasMovingParticles) {
		animationId = requestAnimationFrame(updatePhysics);
	} else {
		animationId = null;
	}
}

// 特定のパーティクルの地面レベルを見つける（積み重なり対応）
function findGroundLevel(particle: Particle, pageBottom: number): number {
	let lowestY = pageBottom;

	// 他の落ちたパーティクルとの衝突をチェック
	for (const other of particles) {
		if (other === particle || !other.grounded) continue;

		// X座標が重なっているかチェック
		const xOverlap =
			Math.abs(particle.x - other.x) < (particle.size + other.size) / 2 * 0.8;

		if (xOverlap) {
			const otherTop = other.y - other.size / 2;
			if (otherTop < lowestY) {
				lowestY = otherTop;
			}
		}
	}

	return lowestY;
}

// バーストエフェクトを作成
function createBurst(centerX: number, centerY: number, options: PixelBurstOptions = {}) {
	const {
		distance = defaultOptions.distance,
		particleSize = defaultOptions.particleSize,
		particleCount = defaultOptions.particleCount + Math.floor(Math.random() * 5),
		burstDuration = defaultOptions.burstDuration
	} = options;

	for (let i = 0; i < particleCount; i++) {
		const angle = (i / particleCount) * 360 + Math.random() * 30 - 15;
		const radian = (angle * Math.PI) / 180;
		const actualDistance = distance + Math.random() * 30;
		const size = particleSize + Math.floor(Math.random() * 4);
		const delay = Math.random() * 50;

		const particle = document.createElement('div');
		particle.className = 'pixel-burst-particle bursting';

		const tx = Math.cos(radian) * actualDistance;
		const ty = Math.sin(radian) * actualDistance;

		particle.style.cssText = `
			left: ${centerX}px;
			top: ${centerY}px;
			width: ${size}px;
			height: ${size}px;
			--tx: ${tx}px;
			--ty: ${ty}px;
			--duration: ${burstDuration}ms;
			animation-delay: ${delay}ms;
		`;

		document.body.appendChild(particle);

		// バーストアニメーション終了後に物理シミュレーション開始
		setTimeout(() => {
			particle.classList.remove('bursting');
			
			const finalX = centerX + tx;
			const finalY = centerY + ty;

			// 初速度を設定（バーストの方向に少し勢いをつける）
			const speed = 2 + Math.random() * 3;
			const vx = Math.cos(radian) * speed * 0.5;
			const vy = Math.sin(radian) * speed * 0.3 - 2; // 上向きに少し飛ばす

			const particleData: Particle = {
				element: particle,
				x: finalX,
				y: finalY,
				vx,
				vy,
				size,
				grounded: false
			};

			particles.push(particleData);

			// アニメーションループを開始
			if (animationId === null) {
				animationId = requestAnimationFrame(updatePhysics);
			}
		}, burstDuration + delay);
	}
}

// グローバルなクリックハンドラを設定
export function initPixelBurst(options: PixelBurstOptions = {}) {
	function handleClick(event: MouseEvent | TouchEvent) {
		let x: number, y: number;

		if (event instanceof TouchEvent) {
			const touch = event.touches[0] || event.changedTouches[0];
			// pageX/pageY を使用してページ座標を取得
			x = touch.pageX;
			y = touch.pageY;
		} else {
			// pageX/pageY を使用してページ座標を取得
			x = event.pageX;
			y = event.pageY;
		}

		createBurst(x, y, options);
	}

	document.addEventListener('click', handleClick);
	document.addEventListener('touchstart', handleClick, { passive: true });

	// クリーンアップ関数を返す
	return () => {
		document.removeEventListener('click', handleClick);
		document.removeEventListener('touchstart', handleClick);
		
		// 全パーティクルを削除
		for (const p of particles) {
			p.element.remove();
		}
		particles.length = 0;
		groundedParticles = [];
		
		if (animationId !== null) {
			cancelAnimationFrame(animationId);
			animationId = null;
		}
	};
}

// 溜まったパーティクルをクリアする
export function clearGroundedParticles() {
	for (const el of groundedParticles) {
		el.style.transition = 'opacity 0.3s ease-out';
		el.style.opacity = '0';
		setTimeout(() => el.remove(), 300);
	}
	
	// particles配列から削除
	for (let i = particles.length - 1; i >= 0; i--) {
		if (particles[i].grounded) {
			particles.splice(i, 1);
		}
	}
	
	groundedParticles = [];
}

export default initPixelBurst;
