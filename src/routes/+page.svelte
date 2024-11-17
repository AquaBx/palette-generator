<script lang="ts">
    import {Matrix,PolygoneMatrix} from "$lib/Matrix";
    import {HexaColor} from "$lib/Color";
    import Input from "../components/Input.svelte";

    let range = [50,100,200,300,400,500,600,700,800,900,950]
    let rangeM = new PolygoneMatrix(range,2)

    let color = $state("#ff0000")
    let light = $state(false)
    let hue = $state(0)
    let lumin = $state(5)
    let lumax = $state(95)
    let satLight = $state(65)
    let satDark = $state(95)
    let hueRotate = $state(180)
    let containerSatDec = $state(8)

    let hueCompl = $derived((hue+hueRotate)%360)
    let saturation = $derived( light ? satLight : satDark )

    let colorInstance = $derived( new HexaColor(color) )
    let hsl = $derived( colorInstance.hsl )

    let A = $derived( new PolygoneMatrix( light ? [50,500,950] : [950,500,50], 2 ) )
    let Ap = $derived( A.inverse() )
    let B = $derived( Ap.multiply(new Matrix([[lumin],[hsl[2]],[lumax]])) )
    let C = $derived( rangeM.multiply(B) )

    $effect(() => {
        for (let j in range) {
            let i = parseInt(j)
            document.querySelector(':root')!.style!.setProperty(`--color-${range[i]}`, `hsl(${hueCompl},${saturation/containerSatDec}%,${C.get(i,0)}%)`);
            document.querySelector(':root')!.style!.setProperty(`--compl-${range[i]}`, `hsl(${hue},${saturation}%,${C.get(i,0)}%)`);
        }
    })
</script>



<div class="relative isolate bg-[var(--color-950)] px-6 py-24 sm:py-32 lg:px-8">

    <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-base/7 font-semibold text-[var(--compl-500)]">Pricing</h2>
        <p class="mt-2 text-balance text-5xl font-semibold tracking-tight text-[var(--color-200)] sm:text-6xl">Choose the right plan for you</p>
    </div>
    <p class="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-[var(--color-300)] sm:text-xl/8">Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.</p>
    
    
<label class="inline-flex items-center mb-5 cursor-pointer">
    <input type="checkbox" bind:checked={light} class="sr-only peer">
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>
    
<Input type="number" min={0} max={360} bind:value={hue}></Input>
<Input type="number" min={0} max={100} bind:value={lumin}></Input>
<Input type="number" min={0} max={100} bind:value={lumax}></Input>
<Input type="number" min={0} max={100} bind:value={satLight}></Input>
<Input type="number" min={0} max={100} bind:value={satDark}></Input>
<Input type="number" min={0} max={360} bind:value={hueRotate}></Input>


<div class="flex gap-2">
    {#each range as shade}
        <div class="w-32 aspect-square" style="background-color:var(--color-{shade})">{shade}</div>
    {/each}
</div>
<div class="flex gap-2">
    {#each range as shade}
        <div class="w-32 aspect-square" style="background-color:var(--compl-{shade})">{shade}</div>
    {/each}
</div>
    
    <div class="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        <div class="rounded-3xl rounded-t-3xl bg-[var(--color-950)] p-8 ring-1 ring-[var(--color-900)] ring-opacity-10 bg-opacity-60 sm:mx-8 sm:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-bl-3xl lg:rounded-tr-none">
            <h3 id="tier-hobby" class="text-base/7 font-semibold text-[var(--compl-500)]">Hobby</h3>
            <p class="mt-4 flex items-baseline gap-x-2">
                <span class="text-5xl font-semibold tracking-tight text-[var(--color-200)]">$29</span>
                <span class="text-base text-[var(--color-300)]">/month</span>
            </p>
            <p class="mt-6 text-base/7 text-[var(--color-300)]">The perfect plan if you&#039;re just getting started with our product.</p>
            <ul role="list" class="mt-8 space-y-3 text-sm/6 text-[var(--color-300)] sm:mt-10">
                <li class="flex gap-x-3">
                    <svg class="h-6 w-5 flex-none  text-[var(--compl-500)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                    </svg>
                    25 products
                </li>
                <li class="flex gap-x-3">
                    <svg class="h-6 w-5 flex-none  text-[var(--compl-500)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                    </svg>
                    Up to 10,000 subscribers
                </li>
                <li class="flex gap-x-3">
                    <svg class="h-6 w-5 flex-none  text-[var(--compl-500)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                    </svg>
                    Advanced analytics
                </li>
                <li class="flex gap-x-3">
                    <svg class="h-6 w-5 flex-none  text-[var(--compl-500)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                    </svg>
                    24-hour support response time
                </li>
            </ul>
            <a href="#" aria-describedby="tier-hobby" class="mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold  text-[var(--compl-200)] ring-1 ring-inset ring-[var(--compl-200)] hover:text-[var(--compl-300)] hover:ring-[var(--compl-300)] sm:mt-10">Get started today</a>
        </div>
        <div class="relative rounded-3xl bg-[var(--color-900)] p-8 shadow-2xl ring-1 ring-[var(--color-900)] ring-opacity-10 sm:p-10">
            <h3 id="tier-enterprise" class="text-base/7 font-semibold text-[var(--color-50)]">Enterprise</h3>
            <p class="mt-4 flex items-baseline gap-x-2">
                <span class="text-5xl font-semibold tracking-tight text-[var(--color-50)]">$99</span>
                <span class="text-base text-[var(--color-400)]">/month</span>
            </p>
            <p class="mt-6 text-base/7 text-[var(--color-100)]">Dedicated support and infrastructure for your company.</p>
            <ul role="list" class="mt-8 space-y-3 text-sm/6 text-[var(--color-100)] sm:mt-10">
                <li class="flex gap-x-3">
                    <svg class="h-6 w-5 flex-none text-[var(--compl-500)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                    </svg>
                    Unlimited products
                </li>
                <li class="flex gap-x-3">
                    <svg class="h-6 w-5 flex-none text-[var(--compl-500)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                    </svg>
                    Unlimited subscribers
                </li>
                <li class="flex gap-x-3">
                    <svg class="h-6 w-5 flex-none text-[var(--compl-500)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                    </svg>
                    Advanced analytics
                </li>
                <li class="flex gap-x-3">
                    <svg class="h-6 w-5 flex-none text-[var(--compl-500)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                    </svg>
                    Dedicated support representative
                </li>
                <li class="flex gap-x-3">
                    <svg class="h-6 w-5 flex-none text-[var(--compl-500)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                    </svg>
                    Marketing automations
                </li>
                <li class="flex gap-x-3">
                    <svg class="h-6 w-5 flex-none text-[var(--compl-500)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                    </svg>
                    Custom integrations
                </li>
            </ul>
            <a href="#" aria-describedby="tier-enterprise" class="mt-8 block rounded-md bg-[var(--compl-500)] px-3.5 py-2.5 text-center text-sm font-semibold text-[var(--color-950)] shadow-sm hover:bg-[var(--compl-400)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--compl-500)] sm:mt-10">Get started today</a>
        </div>
    </div>
</div>

